
// Mood objesini doğrula
export function validateMood(moodObj) {
  if (!moodObj) return false;
  if (!moodObj.mood || typeof moodObj.mood !== 'string') return false;
  if (!moodObj.date) return false;
  if (moodObj.note && moodObj.note.length > 200) return false;
  return true;
}

// Giriş formu için kısa validasyon (kullanıcıdan mood seçilmesini zorunlu kılar)
export function validateMoodInput(mood, note) {
  if (!mood) return { valid: false, error: 'Mood selection is required.' };
  if (note && note.length > 200) return { valid: false, error: 'Note too long.' };
  return { valid: true, error: null };
}
