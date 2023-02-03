

DemoKGViz-2
=========

> Calculating and Visualizing Agro-Meteorological Parameters based on WeKG-MF Knowledge Graph


Abstract
--------

The recent trend of adopting linked-data principles to integrate and publish semantically described open data using W3C standards has led to a large amount of available resources.
In particular, meteorological sensor data have been uplifted into public weather-focused RDF graphs, such as WeKG-MF which offers access to a large set of meteorological variables described through spatial and temporal dimensions.
Nevertheless, these resources include huge numbers of raw observations that are tedious to be explored and reused by lay users. In this paper, we rely on WeKG-MF, to compute various agro-meteorological parameters and synthesized view on them with SPARQL queries. As a result, a LOD platform deployed as a web application allows users to navigate, consume and produce linked datasets of agro-meterological parameters calculated on-the-fly on WeKG-MF.



Online demonstrator
-------------------

An online demonstrator of the interface is available at
<https://nadiaya2019.github.io/DemoKGViz-1/>.


Repository files
----------------

This repository contains:

- `README.md` (this file): providing documentation;
- `index.html`: the interface Web page, allowing to calculate and visualize different charts of agro-meteorological parameters according to users's preferences (location, time period);
- `css/`: contains the style files;
- `js/`: gathers JavaScript libraries;
- `LICENSE.md`.
- `WeKG-MF SPARQL Queries.ipynb` : A `sparqlkernel` jupyter notebook of SPARQL queries (using sparqlkernel package)


Corresponding Author
-------

Nadia Yacoubi Ayadi <https://orcid.org/0000-0002-6132-8718> 

University Cote d'Azur, Inria, CNRS, I3S (UMR 7271), France 

2023
