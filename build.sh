mkdir ./bin
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o ./bin/youtube-dl
sudo chmod a+rx ./bin/youtube-dl

# Install the `exodus_bundler` package, if you haven't already.
pip3 install --user exodus_bundler
export PATH="${HOME}/.local/bin/:${PATH}"

# Create an `ffmpeg` bundle and extract it in the current directory.
exodus --tarball ffmpeg | tar -zx
