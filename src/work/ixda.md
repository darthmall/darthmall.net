---
title: Spotify @ IXDA ’18
order: 2018-02
thumbnail: ixda/ixda_thumb@2x.png
client: Spotify
abstract: >-
  Software for Spotify's IxDA 2018 booth showing a different aspect of your listening habits for each of the three days of the conference.
color: FF6437
---

<figure>
  <img alt="" src="/img/work/ixda/IMG_5723.jpg" />
  <figcaption>The booth on day 3.</figcaption>
</figure>

Along with two other designers at Spotify, I designed and built software for Spotify’s Interaction Design Association (IxDA) 2018 conference booth. Using [Spotify’s public API](https://developer.spotify.com/), we presented users with a small fact about their listening habits that corresponded to pins that they could take with them as a memento of the conference. There was a different theme for each day: day one was your favorite genres based on your top artists; day two was how upbeat your favorite music is; day three was how danceable your favorite music is. We worked with a graphic design agency to create the visual style for the booth and prepare a different backdrop and pins to create a coherent experience at the booth.

We built the application using [Electron](https://electronjs.org/), [svelte](https://svelte.technology/), and [D3](https://d3js.org/).

<figure>
  <img alt="" src="/img/work/ixda/day_1.png" />
  <figcaption>Day 1: The artists of your top three genres.</figcaption>
</figure>

<figure>
  <img alt="" src="/img/work/ixda/day_2.png" />
  <figcaption>
    Day 2: Your top tracks, distributed from left (lower valence) to right (higher valence) based on how positive the music sounds.
  </figcaption>
</figure>

<figure>
  <img alt="" src="/img/work/ixda/day_3.png" />
  <figcaption>
    Day 3: The percentage of your favorite tracks that are considered “danceable” based on features such as tempo and beat strength. At the bottom, your top three most danceable tracks are shown.
  </figcaption>
</figure>
