<div align="center">
  <img src="./public/logo-full.png" width="420" />

  <h3>Mixwave</h3>
  <h4>From video processing to playback in a matter of minutes</h4>
  
  <p align="center">
    <img src="https://img.shields.io/github/license/matvp91/mixwave">
    <img src="https://img.shields.io/github/last-commit/matvp91/mixwave">
    <img src="https://img.shields.io/github/stars/matvp91/mixwave" alt="stars">
    <img src="https://img.shields.io/badge/PR's-welcome-0437F2" alt="pr">
    <a href="https://discord.gg/4hXgz9EsF4">
      <img src="https://img.shields.io/discord/1290252589522223166?v=1" alt="discord">
    </a>
  </p>

  <p align="center">
    <a href="https://matvp91.github.io/mixwave">Documentation</a> · 
    <a href="https://matvp91.github.io/mixwave/getting-started.html">Getting Started</a>
  </p>

  [<img src="./public/button-buy-me-a-coffee.png" width="150" alt="Buy me a coffee button"/>](https://www.buymeacoffee.com/matvp91)
</div>

Mixwave is a self hostable platform that aims to simplify the complexities of video delivery. Transcode and package your media for online streaming with simple API calls and sane defaults, or craft dynamic HLS playlists on the fly with bumpers, ads and filters.

- Transcode your video file into separate quality tracks (eg; 1080p, 720p, 480p).
- Write `HLS CMAF` playlists directly to S3, ready to be played by [HLS.js](https://github.com/video-dev/hls.js).
- Scales `ffmpeg` jobs horizontally.
- Dynamically insert [HLS interstitials](https://developer.apple.com/streaming/GettingStartedWithHLSInterstitials.pdf), like the Netflix bumper.
- Parses a `VMAP`, transcodes and packages the ad media files and inserts them as interstitials, on the fly.
- Ships with a `HLS.js` wrapper that simplifies working with interstitials and a React UI.

We're on [Discord](https://discord.gg/4hXgz9EsF4) if you'd like to chat or need support.

## Why?

Video is quite fragmented, particularly in the way video content is delivered and protected across different platforms and devices. Think [MPEG-DASH vs. HLS](https://www.gumlet.com/learn/hls-vs-dash/), CTR vs. CBCS, [SSAI vs. CSAI](https://clearcode.cc/blog/client-side-server-side-ad-insertion/). Besides, there's also a lot of cool things happening behind closed doors, like SGAI with [AWS EMT](https://docs.aws.amazon.com/mediatailor/latest/ug/server-guided.html) or [Disney+](https://medium.com/disney-streaming/using-sgai-to-deliver-and-play-ads-with-flexibility-and-scale-b5c18aeb7bca). We aim to avoid fragmentation by picking the right tools for the job. If you don't have to do the same thing multiple times, aiming for perfection is a lot easier. We believe `HLS CMAF` is the right way forward, and when playlist manipulation is required, we tend to lean towards `HLS Interstitials`. There's obviously going to be roadblocks ahead, think of devices not supporting multiple video elements or partially serving encrypted fragments opposed to plain ads. We'll tackle these once we get there.

There's a lot of video tooling out there, think of ffmpeg, bento4, shaka-packager, but not in a unified manner. Mixwave implements the excellent work done by others, and tries to make it approachable in the form of an API with a strong focus on scalability and ease of use. The latter is quiet challenging, you'd only have to look at how complex ffmpeg gets when you get into the details.

Video from source to consumer is a hard task to get right, [howvideo.works](https://howvideo.works/) is a great resource to get you started.

## Getting Started

```shell
# Clone repository locally.
git clone git@github.com:matvp91/mixwave.git
cd mixwave

cp config.env.example config.env
# Open config.env and change the variables.
docker compose up -d
```

There's more info in the [Getting Started](https://matvp91.github.io/mixwave/getting-started.html) section in the docs.

## 🤝 Contribute

New contributors are welcome! See `CONTRIBUTING.md` for contributing to the project.

## Star History

<div align="center">
  <img width="620" src="https://api.star-history.com/svg?repos=matvp91/mixwave&type=Date)](https://star-history.com/#matvp91/mixwave" />
</div>
