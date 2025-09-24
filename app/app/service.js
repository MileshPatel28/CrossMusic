import TrackPlayer, { Event } from 'react-native-track-player';

export let trackName = ""

module.exports = async function() {
  try {
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
    TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
    TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
    TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async () => {
      await TrackPlayer.seekTo(0); 
    })
    TrackPlayer.addEventListener('remote-seek', async ({ position }) => {
      await TrackPlayer.seekTo(position);
    });
  } catch (error) {
    console.log('TrackPlayer Service Error:', error);
  }
};