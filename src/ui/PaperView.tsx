import React from 'react';
import { Question } from '../types/question';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const renderTable = (text: string) => {
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

const renderTextWithFormatting = (text: string): any => {
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

const deservesFigureBelow = (q: Question) => {
  const text = q.question.toLowerCase();
  return (q.subject === 'Science' || q.subject === 'Mathematics') && (text.includes('below') || text.includes('figure'));
};

interface PaperViewProps {
  groups: Question[][];
  fatigueLevel: number;
}

const MediaRenderer: React.FC<{ type: 'text' | 'image'; content: string; caption?: string; figureNumber?: number; passageType?: 'prose' | 'poetry'; isScience?: boolean }> = ({ type, content, caption, figureNumber, passageType, isScience }) => {
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

export const PaperView: React.FC<PaperViewProps> = ({ groups, fatigueLevel }) => {
  // Cognitive Load: increase density
  const letterSpacing = fatigueLevel > 1 ? '-0.02em' : 'normal';
  const lineHeight = fatigueLevel > 2 ? '1.1' : '1.3';

  // Whiter, more textured paper SVG filter
  const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  let globalQuestionNumber = 1;
  let globalFigureNumber = 1;
  let lastHeader = '';

  return (
    <div
      className="w-full h-full overflow-y-auto p-6 md:p-8 font-serif text-sm text-justify bg-white text-black transition-all duration-300"
      style={{
        letterSpacing,
        lineHeight,
        backgroundImage: paperTexture,
        backgroundSize: '200px 200px'
      }}
    >
      <div className="max-w-2xl mx-auto pb-12">
        {groups.map((group, groupIdx) => {
          const firstQ = group[0];
          const startNum = globalQuestionNumber;
          const endNum = globalQuestionNumber + group.length - 1;
          const isScienceOrMath = firstQ.subject === 'Science' || firstQ.subject === 'Mathematics';
          const isGroupFigureRef = isScienceOrMath && !!firstQ.figure && group.length > 1;

          return (
            <div key={groupIdx} className={firstQ.subject === 'Science' ? 'mb-8' : 'mb-12'}>
              {/* Reference indicator if grouped */}
              {firstQ.groupId && firstQ.subject !== 'Science' && (
                <div className="mb-4 text-[10px] font-bold uppercase tracking-widest border-b border-black/20 pb-1">
                  Reference: {firstQ.contextTitle || 'Context'}
                </div>
              )}

              {/* Render Shared Media */}
              {isGroupFigureRef ? (
                <>
                  {firstQ.passage && (
                    <MediaRenderer
                      type="text"
                      content={firstQ.passage}
                      passageType={firstQ.passageType || (firstQ.subtopic === 'Poetry' ? 'poetry' : 'prose')}
                      isScience={firstQ.subject === 'Science'}
                    />
                  )}
                  <div className="mb-4 text-xs md:text-sm font-bold italic">
                    For questions {startNum} to {endNum}, refer to the figure below.
                  </div>
                  <MediaRenderer type="image" content={firstQ.figure!} figureNumber={globalFigureNumber++} isScience={true} />
                </>
              ) : (
                <>
                  {firstQ.passage && (
                    <MediaRenderer
                      type="text"
                      content={firstQ.passage}
                      passageType={firstQ.passageType || (firstQ.subtopic === 'Poetry' ? 'poetry' : 'prose')}
                      isScience={firstQ.subject === 'Science'}
                    />
                  )}
                  {firstQ.figure && !deservesFigureBelow(firstQ) && (
                    <MediaRenderer type="image" content={firstQ.figure} figureNumber={globalFigureNumber++} isScience={firstQ.subject === 'Science'} />
                  )}
                </>
              )}


              {/* Render Questions */}
              {group.map((q, qIdx) => {
                const currentNumber = globalQuestionNumber++;
                const isErrorId = q.variant === 'error-identification';

                return (
                  <div key={q.id} id={`q-${q.id}`} className={`${q.subject === 'Science' ? 'mb-6' : 'mb-8'} break-inside-avoid`}>
                    {(() => {
                      const isErrorId = q.variant === 'error-identification';
                      const isTagalogErr = q.subtopic === 'Pagkilala ng Mali';
                      const prevIsErrorId = qIdx > 0 && group[qIdx - 1].variant === 'error-identification';
                      const prevIsTagalogErr = qIdx > 0 && group[qIdx - 1].subtopic === 'Pagkilala ng Mali';

                      const showLanguageHeader = isErrorId && (qIdx === 0 || isTagalogErr !== prevIsTagalogErr);

                      if (showLanguageHeader) {
                        const errHeader = isTagalogErr ? 'Pagkilala ng Mali' : 'Error Identification';
                        if (errHeader === lastHeader) return null;
                        lastHeader = errHeader;

                        return (
                          <div className="mb-8 text-sm leading-relaxed">
                            <div className="mb-1">{errHeader}</div>
                            <div className="">
                              <span className="font-bold">{isTagalogErr ? 'Panuto: ' : 'Instructions: '}</span>
                              {isTagalogErr
                                ? 'Piliin ang salita o parirala na nagpapamali sa pangungusap. Kung ang pangungusap ay walang mali, piliin ang WALANG MALI.'
                                : 'Choose the word or phrase that makes the sentence grammatically incorrect. If the sentence is correct, choose NO ERROR.'}
                            </div>
                          </div>
                        );
                      }

                      // Support for "Question Type" based instructions
                      if (!isErrorId && qIdx === 0) {
                        const isFilipino = q.groupId?.includes('fil') ||
                          ['Talasalitaan', 'Pagbabaybay', 'Pagkilala ng Mali', 'Pangungusap', 'Bahagi ng Pananalita',
                            'Pangngalan', 'Panghalip', 'Pandiwa', 'Pang-uri', 'Pang-abay', 'Pang-ukol', 'Pangatnig',
                            'Pandamdam', 'Pantukoy'].includes(q.subtopic);

                        const vocabularySubtopics = ['Use of Context Clues', 'Talasalitaan'];
                        const spellingSubtopics = ['Spelling', 'Pagbabaybay'];
                        const sentenceCompletionSubtopics = [
                          'Nouns', 'Pronouns', 'Verbs', 'Adjectives', 'Adverbs', 'Prepositions', 'Conjunctions', 'Interjections', 'Determiners',
                          'Subject-Verb', 'Pronoun-Antecedent', 'Bahagi ng Pananalita', 'Pangngalan', 'Panghalip', 'Pandiwa', 'Pang-uri',
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

                        if (!instruction || typeHeader === lastHeader) return null;
                        lastHeader = typeHeader;

                        return (
                          <div className="mb-8 text-sm leading-relaxed">
                            <div className="mb-1">{typeHeader}</div>
                            <div className="">
                              <span className="font-bold">{isFilipino ? 'Panuto: ' : 'Instructions: '}</span>
                              {instruction}
                            </div>
                          </div>
                        );
                      }

                      return null;
                    })()}

                    <div className="flex gap-2 mb-2 items-start">
                      <span className={`font-bold ${isErrorId ? 'leading-[2.5] pt-2' : ''}`}>{currentNumber}.</span>
                      <div className={`whitespace-pre-wrap ${isErrorId ? 'leading-[2.5] pt-2 mb-4' : ''}`}>
                        {renderTextWithFormatting(q.question)}
                      </div>
                    </div>

                    {deservesFigureBelow(q) && (q.figure || firstQ.figure) && !isGroupFigureRef && (
                      <MediaRenderer
                        type="image"
                        content={q.figure || firstQ.figure}
                        figureNumber={globalFigureNumber++}
                        isScience={true}
                      />
                    )}

                    {!isErrorId && (() => {
                      const isCompact = q.options.every(opt => {
                        const displayOpt = opt.replace(/^(\(?[A-E]\)[\.\s-]*|[A-E]\.[\s-]*)/, '').trim() || opt;
                        return displayOpt.length < 20;
                      });

                      return (
                        <div className={`pl-6 ${isCompact ? 'flex flex-wrap gap-x-8 gap-y-2' : 'space-y-2 md:space-y-1'}`}>
                          {q.options.map((opt, optIdx) => {
                            const letter = String.fromCharCode(65 + optIdx);
                            const displayOpt = opt.replace(/^(\(?[A-E]\)[\.\s-]*|[A-E]\.[\s-]*)/, '').trim() || opt;
                            return (
                              <div key={optIdx} className="flex gap-2 whitespace-pre-wrap">
                                <span className="font-bold">{letter}.</span>
                                <span>{renderTextWithFormatting(displayOpt)}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="text-center mt-12 italic opacity-70">
          *** END OF SECTION ***
        </div>
      </div>
    </div>
  );
};

