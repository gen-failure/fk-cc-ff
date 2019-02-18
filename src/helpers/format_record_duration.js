import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment);
export default function(duration) {
  return moment.duration(duration, "milliseconds").format();
}
