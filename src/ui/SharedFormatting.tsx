import React from 'react';
import { Question } from '../types/question';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export const renderTable = (text: string) => {
  const lines = text.trim().split('\n');
  const tableLines = lines.filter(line => line.trim().startsWith('|') && line.trim().endsWith('|'));

  if (tableLines.length < 2) return null;

  const rows = tableLines.map(line => {
    return line
      .split('|')
      .filter((_, i, arr) => i > 0 && i < arr.length - 1)
      .map(cell => cell.trim());
  });

  // Check if second row is a separator (e.g., |---|---|)
  const hasSeparator = rows[1] && rows[1].every(cell => /^:?-+:?$/.test(cell));
  const dataRows = hasSeparator ? rows.filter((_, i) => i !== 1) : rows;
  const isHeader = hasSeparator;

  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-black/20 text-xs md:text-sm">
        <tbody>
          {dataRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                const isFirstRowHeader = isHeader && rowIndex === 0;
                return (
                  <td
                    key={cellIndex}
                    className={`border border-black/20 p-2 ${isFirstRowHeader ? 'font-bold bg-black/5' : ''}`}
                  >
                    {renderTextWithFormatting(cell)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const renderTextWithFormatting = (text: string): any => {
  if (typeof text !== 'string') return text;

  // Split content based on table blocks
  // A table block starts with | and consists of multiple lines starting with |
  const lines = text.split('\n');
  const blocks: (string | { type: 'table'; content: string })[] = [];
  let currentProse = '';
  let currentTable = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isTableLine = line.trim().startsWith('|') && line.trim().endsWith('|');

    if (isTableLine) {
      if (currentProse) {
        blocks.push(currentProse.trim());
        currentProse = '';
      }
      currentTable += (currentTable ? '\n' : '') + line;
    } else {
      if (currentTable) {
        blocks.push({ type: 'table', content: currentTable });
        currentTable = '';
      }
      currentProse += (currentProse ? '\n' : '') + line;
    }
  }

  if (currentProse) blocks.push(currentProse.trim());
  if (currentTable) blocks.push({ type: 'table', content: currentTable });

  return blocks.map((block, i) => {
    if (typeof block === 'object') {
      return <div key={`table-${i}`}>{renderTable(block.content)}</div>;
    }

    // Now TypeScript knows 'block' is a string
    const mathBlocks = block.split(/(\$\$[\s\S]*?\$\$)/g);
    return mathBlocks.map((mb, j) => {
      if (mb.startsWith('$$') && mb.endsWith('$$')) {
        return (
          <div key={`blockmath-${i}-${j}`} className="my-2 flex justify-center overflow-x-auto">
            <BlockMath math={mb.slice(2, -2)} />
          </div>
        );
      }

      const inlines = mb.split(/(\$[\s\S]*?\$)/g);
      return inlines.map((inline, k) => {
        if (inline.startsWith('$') && inline.endsWith('$')) {
          return <InlineMath key={`inline-${i}-${j}-${k}`} math={inline.slice(1, -1)} />;
        }

        const uTagParts = inline.split(/(<u>.*?<\/u>)/g);
        return uTagParts.map((uPart, uIdx) => {
          if (uPart.startsWith('<u>') && uPart.endsWith('</u>')) {
            return <span key={`u-${i}-${j}-${k}-${uIdx}`} className="underline decoration-1 underline-offset-2">{uPart.slice(3, -4)}</span>;
          }

          const underlineParts = uPart.split(/(_.*?_)/g);
          return underlineParts.map((subUPart, subUIdx) => {
            if (subUPart.startsWith('_') && subUPart.endsWith('_')) {
              const content = subUPart.slice(1, -1);
              // If it's just a sequence of underscores (blank line), render literally
              if (content.length === 0 || /^_+$/.test(content)) {
                return <React.Fragment key={`uu-${i}-${j}-${k}-${uIdx}-${subUIdx}`}>{subUPart}</React.Fragment>;
              }
              return <span key={`uu-${i}-${j}-${k}-${uIdx}-${subUIdx}`} className="underline decoration-1 underline-offset-2">{content}</span>;
            }

            // Error Identification Support: {text}[label]
            const errorIDParts = subUPart.split(/(\{.*?\}\[.*?\])/g);
            return errorIDParts.map((part, l) => {
              const match = part.match(/^\{(.*?)\}\[(.*?)\]$/);
              if (match) {
                return (
                  <span key={`err-${i}-${j}-${k}-${uIdx}-${subUIdx}-${l}`} className="relative inline-block mx-1 underline underline-offset-[3px] decoration-black">
                    {match[1]}
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] no-underline uppercase tracking-tighter">
                      {match[2]}
                    </span>
                  </span>
                );
              }
              return <React.Fragment key={`text-${i}-${j}-${k}-${uIdx}-${subUIdx}-${l}`}>{part}</React.Fragment>;
            });
          });
        });

      });
    });
  });
};

export const getInstruction = (q: Question) => {
  const isFilipino = q.groupId?.includes('fil') ||
    ['Talasalitaan', 'Pagbabaybay', 'Pagkilala ng Mali', 'Pangungusap', 'Bahagi ng Pananalita',
      'Pangngalan', 'Panghalip', 'Pandiwa', 'Pang-uri', 'Pang-abay', 'Pang-ukol', 'Pangatnig',
      'Pandamdam', 'Pantukoy'].includes(q.subtopic);

  // If explicit instruction exists (hydrated or defined), use it
  if (q.instruction) {
    let typeHeader = q.subtopic;
    if (q.groupId?.startsWith('PARA-')) {
      typeHeader = isFilipino ? 'Pag-aayos ng Talata' : 'Paragraph Arrangement';
    } else if (q.groupId?.includes('synonym') || q.subtopic === 'Use of Context Clues' || q.subtopic === 'Talasalitaan') {
      typeHeader = isFilipino ? 'Talasalitaan' : 'Vocabulary';
    } else if (q.groupId?.includes('antonym')) {
      typeHeader = isFilipino ? 'Talasalitaan' : 'Vocabulary';
    }
    return { typeHeader, instruction: q.instruction, isFilipino };
  }

  const isErrorId = q.variant === 'error-identification';
  const isTagalogErr = q.subtopic === 'Pagkilala ng Mali';

  if (isErrorId) {
    const typeHeader = isTagalogErr ? 'Pagkilala ng Mali' : 'Error Identification';
    const instruction = isTagalogErr
      ? 'Piliin ang salita o parirala na nagpapamali sa pangungusap. Kung ang pangungusap ay walang mali, piliin ang WALANG MALI.'
      : 'Choose the word or phrase that makes the sentence grammatically incorrect. If the sentence is correct, choose NO ERROR.';
    return { typeHeader, instruction, isFilipino: isTagalogErr };
  }

  const vocabularySubtopics = ['Use of Context Clues', 'Talasalitaan'];
  const spellingSubtopics = ['Spelling', 'Pagbabaybay'];
  const sentenceCompletionSubtopics = [
    'Verbs', 'Prepositions', 'Adverbs', 'Nouns', 'Pronoun-Antecedent', 'Determiners',
    'Subject-Verb', 'Redundancy', 'Bahagi ng Pananalita', 'Pangngalan', 'Panghalip', 'Pandiwa', 'Pang-uri',
    'Pang-abay', 'Pang-ukol', 'Pangatnig', 'Pandamdam', 'Pantukoy'
  ];

  let instruction = '';
  let typeHeader = q.subtopic;

  if (q.groupId?.startsWith('PARA-')) {
    typeHeader = isFilipino ? 'Pag-aayos ng Talata' : 'Paragraph Arrangement';
    instruction = isFilipino
      ? 'Ayusin ang mga sumusunod na pangungusap upang makabuo ng isang lohikal na talata.'
      : 'Arrange the following sentences to form a coherent paragraph.';
  } else if (vocabularySubtopics.includes(q.subtopic) || q.groupId?.includes('antonym')) {
    typeHeader = isFilipino ? 'Talasalitaan' : 'Vocabulary';
    if (q.groupId?.includes('antonym')) {
      instruction = isFilipino
        ? 'Piliin ang kasalungat na kahulugan ng salitang may salungguhit o nakatukoy sa bawat pangungusap.'
        : 'Choose the word or phrase that is opposite in meaning to the italicized/underlined word or phrase in each sentence.';
    } else {
      instruction = isFilipino
        ? 'Piliin ang pinakaangkop na kahulugan ng salitang may salungguhit o nakatukoy sa bawat pangungusap.'
        : 'Choose the word or phrase that is closest in meaning to the italicized/underlined word or phrase in each sentence.';
    }
  } else if (spellingSubtopics.includes(q.subtopic)) {
    typeHeader = isFilipino ? 'Pagbabaybay' : 'Spelling';
    instruction = isFilipino
      ? 'Piliin ang salitang may maling baybay.'
      : 'Identify the word that is spelled incorrectly.';
  } else if (sentenceCompletionSubtopics.includes(q.subtopic)) {
    typeHeader = isFilipino ? 'Wastong Gamit' : 'Sentence Completion';
    instruction = isFilipino
      ? 'Piliin ang pinakamahusay na salita o parirala upang kumpletuhin ang bawat pangungusap.'
      : 'Choose the best word or phrase to complete each sentence.';
  } else if (q.subject === 'Science' || q.subject === 'Mathematics') {
    typeHeader = q.subject;
    instruction = 'Choose the best answer for each question.';
  } else if (q.subject === 'Reading Comprehension') {
    typeHeader = isFilipino ? 'Pag-unawa sa Binasa' : 'Reading Comprehension';
    instruction = isFilipino
      ? 'Basahin ang sumusunod na teksto at sagutin ang mga tanong.'
      : 'Read the following passage and answer the questions that follow.';
  }

  return { typeHeader, instruction, isFilipino };
};

export const deservesFigureBelow = (q: Question) => {
  const text = q.question.toLowerCase();
  return (q.subject === 'Science' || q.subject === 'Mathematics') && (text.includes('below') || text.includes('figure'));
};


export const MediaRenderer: React.FC<{ type: 'text' | 'image'; content: string; caption?: string; figureNumber?: number; passageType?: 'prose' | 'poetry'; isScience?: boolean }> = ({ type, content, caption, figureNumber, passageType, isScience }) => {
  if (type === 'text') {
    if (passageType === 'poetry') {
      // More robust stanza splitting (double newlines or more)
      const stanzas = content.trim().split(/\n\s*\n/);
      if (stanzas.length > 3) {
        const mid = Math.ceil(stanzas.length / 2);
        const col1 = stanzas.slice(0, mid).join('\n\n');
        const col2 = stanzas.slice(mid).join('\n\n');
        return (
          <div className="mb-8 w-full">
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 font-serif">
              <div className="whitespace-pre-wrap leading-loose text-center">{renderTextWithFormatting(col1)}</div>
              <div className="whitespace-pre-wrap leading-loose text-center">{renderTextWithFormatting(col2)}</div>
            </div>
            {caption && <p className="text-xs italic mt-6 text-center opacity-70 border-t border-black/5 pt-4">{renderTextWithFormatting(caption)}</p>}
          </div>
        );
      }
    }

    return (
      <div className={`mb-8 ${passageType === 'poetry' ? 'flex flex-col items-center' : ''}`}>
        <div className={`whitespace-pre-wrap leading-loose ${passageType === 'poetry' ? 'text-center font-serif' : ''}`}>{renderTextWithFormatting(content)}</div>
        {caption && <p className="text-xs italic mt-2 text-center opacity-70">{renderTextWithFormatting(caption)}</p>}
      </div>
    );
  }

  if (type === 'image') {
    let displayCaption = caption;
    if (displayCaption && figureNumber) {
      displayCaption = `Figure ${figureNumber}: ${displayCaption}`;
    } else if (figureNumber) {
      displayCaption = `Figure ${figureNumber}`;
    }

    return (
      <div className={`${isScience ? 'mb-4' : 'mb-8'} flex flex-col items-center`}>
        <img
          src={content}
          alt={displayCaption || 'Figure'}
          className="max-w-[250px] max-h-[250px] h-auto w-auto object-contain mix-blend-multiply"
        />
        {displayCaption && <p className="text-xs italic mt-2 text-center opacity-70">{renderTextWithFormatting(displayCaption)}</p>}
      </div>
    );
  }
  return null;
};
