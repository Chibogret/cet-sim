import React from 'react';
import { Question } from '../types/question';
import 'katex/dist/katex.min.css';
import { renderTextWithFormatting, deservesFigureBelow, MediaRenderer, getInstruction } from './SharedFormatting';

interface PaperViewProps {
  groups: Question[][];
  fatigueLevel: number;
}


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

