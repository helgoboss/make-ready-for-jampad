# Make ready for Jampad

This is a script that makes a bunch of WAV files ready for being played in Jam Pad. In particular it does the following things:

1. Convert the WAV file to MP3 using the highest possible constant bitrate
    - Constant bitrate is important to make seeking of very long files work fast and correctly.
2. Set the MP3 title tag to the name of the file
3. Apply an appropriate gain via mp3gain
    - The gain is applied in a lossless way. However, it's not done via ReplayGain tag because the web player in Jam Pad is not expected to have ReplayGain support.

## Installation

1. Install the following packages via Chocolatey (or manually)
    - mp3gain
    - lame
2. Execute `npm install --global`

## Usage

    make-ready-for-jampad *.wav