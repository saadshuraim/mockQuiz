import Papa from 'papaparse';
import { Question } from './storage';

export const parseQuizFile = (file: File): Promise<Question[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const textContent = event.target?.result as string;
      parseQuizText(textContent)
        .then(resolve)
        .catch(err => reject(new Error(`Error in ${file.name}: ${err.message}`)));
    };
    reader.onerror = () => reject(new Error('Could not read file.'));
    reader.readAsText(file);
  });
};

export const parseQuizText = (textContent: string): Promise<Question[]> => {
  return new Promise((resolve, reject) => {
    try {
      const text = textContent.trim();
      if (text.length === 0) {
        return reject(new Error("Pasted text is empty."));
      }

      // 1. Check for JSON
      if (text.startsWith('[') || text.startsWith('{')) {
        try {
          let data = JSON.parse(text);
          // If it's a single object, wrap it in an array
          if (!Array.isArray(data)) {
            data = [data];
          }
          // Validate the structure
          const validatedQuestions = data.map((item: any, index: number) => {
            if (!item.question) {
              throw new Error(`Question ${index + 1} is missing the "question" field`);
            }
            if (!item.options || typeof item.options !== 'object') {
              throw new Error(`Question ${index + 1} is missing valid "options" object`);
            }
            if (!item.answer) {
              throw new Error(`Question ${index + 1} is missing the "answer" field`);
            }
            return {
              id: item.id || `q${index + 1}`,
              question: item.question,
              options: item.options,
              answer: item.answer.toLowerCase(),
              explanation: item.explanation || undefined,
              category: item.category || undefined,
              level: item.level || undefined,
            };
          });
          return resolve(validatedQuestions);
        } catch (err) {
          return reject(new Error(`JSON Parse Error: ${err instanceof Error ? err.message : 'Invalid JSON'}`));
        }
      }

      // 2. Check for TXT format
      if (text.includes('---') || (text.includes('Q:') && text.includes('Answer:'))) {
        const questions: Question[] = [];
        const blocks = text.split('---');
        
        for (const block of blocks) {
          if (block.trim().length === 0) continue;
          
          const lines = block.trim().split('\n');
          const q: Partial<Question> = { 
            id: `q${questions.length + 1}`, 
            options: {} 
          };
          
          lines.forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) return;
            
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            
            if (key === 'Q' || key === 'Question') q.question = value;
            if (key === 'A') q.options!.a = value;
            if (key === 'B') q.options!.b = value;
            if (key === 'C') q.options!.c = value;
            if (key === 'D') q.options!.d = value;
            if (key === 'Answer') q.answer = value.toLowerCase();
            if (key === 'Explanation') q.explanation = value;
            if (key === 'Category') q.category = value;
            if (key === 'Level') q.level = value;
          });
          
          if (!q.question || !q.answer) {
            return reject(new Error('Invalid TXT format. Each question must have "Q:" and "Answer:".'));
          }
          
          questions.push(q as Question);
        }
        
        return resolve(questions);
      }

      // 3. Check for CSV
      if (text.includes(',')) {
        const result = Papa.parse(text, { header: true, skipEmptyLines: true });
        
        if (result.errors.length) {
          return reject(new Error(`CSV Parse Error: ${result.errors[0].message}`));
        }
        
        const questions: Question[] = result.data.map((row: any, i: number) => {
          if (!row.question || !row.answer) {
            throw new Error(`CSV Error: Row ${i + 2} is missing required columns (question, answer).`);
          }
          
          const options: { [key: string]: string } = {};
          if (row.option_a) options.a = row.option_a;
          if (row.option_b) options.b = row.option_b;
          if (row.option_c) options.c = row.option_c;
          if (row.option_d) options.d = row.option_d;
          
          if (Object.keys(options).length === 0) {
            throw new Error(`CSV Error: Row ${i + 2} has no options (need at least option_a).`);
          }
          
          return {
            id: row.id || `q${i + 1}`,
            question: row.question,
            options: options,
            answer: row.answer.toLowerCase(),
            explanation: row.explanation || undefined,
            category: row.category || undefined,
            level: row.level || undefined,
          };
        });
        
        return resolve(questions);
      }

      // 4. No match
      reject(new Error("Could not detect format. Please paste valid JSON, CSV, or our Simple TXT format."));

    } catch (err) {
      reject(new Error(`Parsing failed: ${err instanceof Error ? err.message : 'Unknown error'}`));
    }
  });
};
