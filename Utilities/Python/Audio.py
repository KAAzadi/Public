import pyaudio
import wave
from pydub import AudioSegment

#This class is heavily influenced by a realpython.com guide (https://realpython.com/playing-and-recording-sound-python/).
#Comments were added to serve as reminders so this code can be recreated in the future with more autonomy as future iterations take place.
class Audio(object):
    def __init__(self, childName):
      #holds the audio file
      self._audio = list()
      self._chunk = 1024
      self._format = pyaudio.paInt16
      self._channels = 2
      #recording at sample rate of 44.1 kHz
      self._rate = 44100
      #audioLength is how long recording is
      self._audioLength = 15
      self._fileName = childName+"WishList"

      self._pAud = pyaudio.PyAudio()
      
    def SaveAsWav(self):
      file = wave.open(self._fileName+".wav", "wb")
      file.setnchannels(self._channels)
      file.setsampwidth(self._pAud.get_sample_size(self._format))
      file.setframerate(self._rate)
      file.writeframes(b''.join(self._frames))
      file.close()

    def SaveAsMp3(self):
      recording = AudioSegment.from_wav(self._fileName)
      recording.export(self._fileName+".mp3", format='mp3')

    def Record(self):
        print("Recording")
        stream = self._pAud.open(format = self._format, channels = self._channels, rate = self._rate, frames_per_buffer = self._chunk, input = True)

        #clears out audio to reset for next recording
        self._audio = list()

        for i in range(int(self.rate/self._chunk * self._audioLength)):
            sound = stream.read(self._chunk)
            self._audio.append(sound)

        stream.stop_stream()
        stream.close()
        self._pAud.terminate()

        print("Recording Complete")

        self.SaveAsWav()
        self.SaveAsMp3



