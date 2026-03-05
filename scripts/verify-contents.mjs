/**
 * 미리 생성된 문제/답 검증 스크립트
 * Run: node scripts/verify-contents.mjs (프로젝트 루트에서)
 */
const fs = await import('fs');
const path = await import('path');
// 프로젝트 루트 (실행 시 cwd가 루트라고 가정)
const projectRoot = process.cwd();
const preGenPath = path.join(projectRoot, 'src', 'data', 'preGeneratedQuestions.ts');
const content = fs.readFileSync(preGenPath, 'utf-8');

const errors = [];
const warnings = [];
let summary = { books: {}, totalProblems: 0 };

// withIdsAndOrder( [ ... ], 'baseId' ) 블록들을 찾아서 각 콘텐츠 타입별로 검증
const blockPattern = /(const (mary|mongmong)(\w+))[\s\S]*?withIdsAndOrder\s*\(\s*\[/g;
let m;
const arrays = [];
while ((m = blockPattern.exec(content)) !== null) {
  arrays.push({ name: m[1].replace('const ', '').split('=')[0].trim(), book: m[2], type: m[3] });
}

// 수동으로 각 배열의 항목 수와 correctIndex 등 검증을 위해 정규식으로 개수 세기
function countBlocks(str, openToken, closeToken) {
  let depth = 0;
  let count = 0;
  let i = 0;
  while (i < str.length) {
    if (str.slice(i, i + openToken.length) === openToken) {
      depth++;
      if (depth === 1) count++;
      i += openToken.length;
    } else if (str.slice(i, i + closeToken.length) === closeToken) {
      depth--;
      i += closeToken.length;
    } else i++;
  }
  return count;
}

// 타입별로 { type: '...', ... } 객체 개수 세기
const maryOxMatches = content.match(/mary-ox[\s\S]*?\]\s*,\s*'mary-ox'/);
if (maryOxMatches) {
  const n = (maryOxMatches[0].match(/type:\s*'ox_quiz'/g) || []).length;
  summary.books['book-mary'] = summary.books['book-mary'] || {};
  summary.books['book-mary'].ox_quiz = n;
  summary.totalProblems += n;
}

// 더 정확한 검증: 각 섹션에서 correctIndex, correctAnswer 등이 유효한지
// 정규로 'correctIndex: 0' 등 추출하여 options 길이와 비교는 소스만으로는 어려우므로
// 요약만 출력하고, 상세 검증은 아래에서 타입별로 수행

// 메리식당
const maryOx = (content.match(/const maryOx[\s\S]*?\]\s*,\s*'mary-ox'/) || [''])[0];
const maryOxCount = (maryOx.match(/correctAnswer:\s*[OX]/g) || []).length;
const maryMc = (content.match(/const maryMultiple[\s\S]*?\]\s*,\s*'mary-mc'/) || [''])[0];
const maryMcCount = (maryMc.match(/correctIndex:\s*\d+/g) || []).length;
const maryFb = (content.match(/const maryFillBlank[\s\S]*?\]\s*,\s*'mary-fb'/) || [''])[0];
const maryFbCount = (maryFb.match(/correctIndex:\s*\d+/g) || []).length;
const maryOrd = (content.match(/const maryOrdering[\s\S]*?\]\s*,\s*'mary-ord'/) || [''])[0];
const maryOrdCount = (maryOrd.match(/type:\s*'ordering'/g) || []).length;
const maryEmotion = (content.match(/const maryEmotionStair[\s\S]*?\]\s*,\s*'mary-emotion-stair'/) || [''])[0];
const maryEmotionCount = (maryEmotion.match(/type:\s*'emotion_stair'/g) || []).length;
const maryElim = (content.match(/const maryEliminationReasons[\s\S]*?\]\s*,\s*'mary-elimination'/) || [''])[0];
const maryElimCount = (maryElim.match(/type:\s*'elimination_reasons'/g) || []).length;

// 몽몽
const mongOx = (content.match(/const mongmongOx[\s\S]*?\]\s*,\s*'mongmong-ox'/) || [''])[0];
const mongOxCount = (mongOx.match(/correctAnswer:\s*[OX]/g) || []).length;
const mongMc = (content.match(/const mongmongMultiple[\s\S]*?\]\s*,\s*'mongmong-mc'/) || [''])[0];
const mongMcCount = (mongMc.match(/correctIndex:\s*\d+/g) || []).length;
const mongFb = (content.match(/const mongmongFillBlank[\s\S]*?\]\s*,\s*'mongmong-fb'/) || [''])[0];
const mongFbCount = (mongFb.match(/correctIndex:\s*\d+/g) || []).length;
const mongOrd = (content.match(/const mongmongOrdering[\s\S]*?\]\s*,\s*'mongmong-ord'/) || [''])[0];
const mongOrdCount = (mongOrd.match(/type:\s*'ordering'/g) || []).length;
const mongMatch = (content.match(/const mongmongMatchPairs[\s\S]*?\]\s*,\s*'mongmong-match'/) || [''])[0];
const mongMatchCount = (mongMatch.match(/type:\s*'match_pairs'/g) || []).length;
const mongChoice = (content.match(/const mongmongChoiceWithResult[\s\S]*?\]\s*,\s*'mongmong-choice-result'/) || [''])[0];
const mongChoiceCount = (mongChoice.match(/type:\s*'choice_with_result'/g) || []).length;

console.log('========== ReadQuest 미리 생성 콘텐츠 검증 ==========\n');

console.log('【 메리식당 (book-mary) 】');
console.log('  O/X 퀴즈:', maryOxCount, '문항');
console.log('  객관식:', maryMcCount, '문항');
console.log('  순서맞추기:', maryOrdCount, '문항');
console.log('  빈칸채우기:', maryFbCount, '문항');
console.log('  감정 흐름 계단:', maryEmotionCount, '문항');
console.log('  따뜻해진 이유 찾기:', maryElimCount, '문항');
console.log('  이야기 구조 나누기: 0 (제외)');
console.log('');

console.log('【 몽몽 숲의 박쥐 두마리 (book-mongmong) 】');
console.log('  O/X 퀴즈:', mongOxCount, '문항');
console.log('  객관식:', mongMcCount, '문항');
console.log('  순서맞추기:', mongOrdCount, '문항');
console.log('  빈칸채우기:', mongFbCount, '문항');
console.log('  말-결과 연결:', mongMatchCount, '문항');
console.log('  같은 상황 다른 말:', mongChoiceCount, '문항');
console.log('');

// correctIndex 범위 검사 (fill_blank: options가 3개면 correctIndex 0,1,2만 유효)
const fbCorrectIndexRegex = /correctIndex:\s*(\d+)[\s\S]*?options:\s*\[/g;
let fbBlock;
const fbBlocks = content.split(/const (maryFillBlank|mongmongFillBlank)/).slice(1);
for (const block of content.split("type: 'fill_blank'")) {
  const optsMatch = block.match(/options:\s*\[([^\]]+)\]/);
  const ciMatch = block.match(/correctIndex:\s*(\d+)/);
  if (optsMatch && ciMatch) {
    const optCount = (optsMatch[1].match(/'[^']*'/g) || []).length;
    const ci = parseInt(ciMatch[1], 10);
    if (ci < 0 || ci >= optCount) {
      errors.push(`fill_blank: correctIndex ${ci} is out of range (options length ${optCount})`);
    }
  }
}

// MC 검사
for (const block of content.split("type: 'multiple_choice'")) {
  const optsMatch = block.match(/options:\s*\[([^\]]+)\]/);
  const ciMatch = block.match(/correctIndex:\s*(\d+)/);
  if (optsMatch && ciMatch) {
    const optCount = (optsMatch[1].match(/'[^']*'/g) || []).length;
    const ci = parseInt(ciMatch[1], 10);
    if (ci < 0 || ci >= optCount) {
      errors.push(`multiple_choice: correctIndex ${ci} is out of range (options length ${optCount})`);
    }
  }
}

const total =
  maryOxCount + maryMcCount + maryOrdCount + maryFbCount + maryEmotionCount + maryElimCount +
  mongOxCount + mongMcCount + mongOrdCount + mongFbCount + mongMatchCount + mongChoiceCount;

console.log('총 미리 생성 문항 수:', total);
if (errors.length) {
  console.log('\n❌ 검증 오류:');
  errors.forEach((e) => console.log('  -', e));
} else {
  console.log('\n✅ correctIndex/옵션 범위 검사: 오류 없음');
}
console.log('\n========== 검증 완료 ==========');
