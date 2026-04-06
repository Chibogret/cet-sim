import React from 'react';
import { QuestionGroup, MediaContent } from '../data/questions';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const renderTextWithFormatting = (text: string) => {
  if (typeof text !== 'string') return text;
  
  // Split by $$...$$ first
  const blocks = text.split(/(\$\$[\s\S]*?\$\$)/g);
  
  return blocks.map((block, i) => {
    if (block.startsWith('$$') && block.endsWith('$$')) {
      return (
        <div key={i} className="my-2 flex justify-center overflow-x-auto">
          <BlockMath math={block.slice(2, -2)} />
        </div>
      );
    }
    
    // Split by $...$
    const inlines = block.split(/(\$[\s\S]*?\$)/g);
    return inlines.map((inline, j) => {
      if (inline.startsWith('$') && inline.endsWith('$')) {
        return <InlineMath key={`${i}-${j}`} math={inline.slice(1, -1)} />;
      }
      return <React.Fragment key={`${i}-${j}`}>{inline}</React.Fragment>;
    });
  });
};

interface PaperViewProps {
  groups: QuestionGroup[];
  fatigueLevel: number;
}

const MediaRenderer: React.FC<{ media: MediaContent; figureNumber?: number }> = ({ media, figureNumber }) => {
  if (media.type === 'text') {
    return (
      <div className="mb-6 p-4 border-l-2 border-black bg-black/5">
        <div className="whitespace-pre-wrap leading-relaxed">{renderTextWithFormatting(media.content)}</div>
        {media.caption && <p className="text-xs italic mt-2 text-center">{renderTextWithFormatting(media.caption)}</p>}
      </div>
    );
  }
  if (media.type === 'image') {
    let displayCaption = media.caption;
    if (displayCaption && figureNumber) {
      displayCaption = `Figure ${figureNumber}: ${displayCaption}`;
    } else if (figureNumber) {
      displayCaption = `Figure ${figureNumber}`;
    }

    return (
      <div className="mb-6 flex flex-col items-center">
        <img src={media.content} alt={displayCaption || 'Figure'} className="max-w-full h-auto border border-black grayscale mix-blend-multiply" />
        {displayCaption && <p className="text-xs italic mt-2 text-center">{renderTextWithFormatting(displayCaption)}</p>}
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
        {groups.map((group) => (
          <div key={group.id} className="mb-12">
            {/* Render Shared Media */}
            {group.sharedMedia?.map((media, idx) => {
              const isFigure = media.type === 'image';
              const figNum = isFigure ? globalFigureNumber++ : undefined;
              return <MediaRenderer key={idx} media={media} figureNumber={figNum} />;
            })}

            {/* Render Questions */}
            {group.questions.map((q) => {
              const currentNumber = globalQuestionNumber++;
              return (
                <div key={q.id} id={`q-${q.id}`} className="mb-8 break-inside-avoid">
                  {/* Render Question-Specific Media */}
                  {q.media?.map((media, idx) => {
                    const isFigure = media.type === 'image';
                    const figNum = isFigure ? globalFigureNumber++ : undefined;
                    return <MediaRenderer key={idx} media={media} figureNumber={figNum} />;
                  })}
                  
                  <div className="flex gap-2 mb-2">
                    <span className="font-bold">{currentNumber}.</span>
                    <div>{renderTextWithFormatting(q.prompt)}</div>
                  </div>
                  <div className="pl-6 space-y-2 md:space-y-1">
                    {q.options.map(opt => {
                      return (
                        <div key={opt} className="flex gap-2">
                          <span>{renderTextWithFormatting(opt)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div className="text-center mt-12 italic opacity-70">
          *** END OF SECTION ***
        </div>
      </div>
    </div>
  );
};
