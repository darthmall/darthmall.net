---
title: "Jigs: Visualized"
media: /img/work/jigs/network.png
mediaAlt: >-
    A network of red circles each representing one jig connected to other jigs by white
    lines against a black background
order: 2012-08
thumbnail: /img/work/jigs/jigs_thumb@2x.png
client: Student Project
role: Designed and built
repo: https://github.com/darthmall/Irish-Tune-Visualization
class: ionian
color: DF4A3F
---

This data visualization attempts to show how much similarity exists in a corpus of Irish
jigs taken from [The Session][thesession], an online database of Irish tunes.

Each tune is represented as a node in a graph. Similarity is calculated for a pair of
tunes as Levenshtein distance between the [ABC notation][abc] for each of the tunes. If
the similarity is above a threshold, an edge is created between the two tunes. The higher
the similarity, the stronger the force on that edge, drawing the two nodes closer
together. Each node is sized according to the weighted degree of that node: the larger the
node, the more tunes it's related to.

[thesession]: https://thesession.org
[abc]: http://abcnotation.com
