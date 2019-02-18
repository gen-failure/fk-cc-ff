export default function(number) {
  const midiLabels = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']
  let note = midiLabels[number % 12];
  let octave = Math.floor(number / 12)-1;

  return `${note}${octave}`;
}
