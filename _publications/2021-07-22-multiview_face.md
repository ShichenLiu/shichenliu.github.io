---
layout: default

paper-title: 'Topologically Consistent Multi-View Face Inference Using Volumetric Sampling'
authors: Tianye Li, <u>Shichen Liu</u>, Timo Bolkart, Jiayi Liu, Hao Li, Yajie Zhao

conference: IEEE International Conference on Computer Vision
conference-brief: ICCV
year: 2021
award: oral

link: https://arxiv.org/abs/2110.02948
code: https://github.com/tianyeli/tofu
talk: https://tianyeli.github.io/tofu/talk.mp4

img: /assets/images/mvs_face.png
---

High-fidelity face digitization solutions often combine multi-view stereo (MVS) techniques for 3D reconstruction and a non-rigid registration step to establish dense correspondence across identities and expressions. A common problem is the need for manual clean-up after the MVS step, as 3D scans are typically affected by noise and outliers and contain hairy surface regions that need to be cleaned up by artists. Furthermore, mesh registration tends to fail for extreme facial expressions. Most learning-based methods use an underlying 3D morphable model (3DMM) to ensure robustness, but this limits the output accuracy for extreme facial expressions. In addition, the global bottleneck of regression architectures cannot produce meshes that tightly fit the ground truth surfaces. We propose ToFu, Topologically consistent Face from multi-view, a geometry inference framework that can produce topologically consistent meshes across facial identities and expressions using a volumetric representation instead of an explicit underlying 3DMM. Our novel progressive mesh generation network embeds the topological structure of the face in a feature volume, sampled from geometry-aware local features. A coarse-to-fine architecture facilitates dense and accurate facial mesh predictions in a consistent mesh topology. ToFu further captures displacement maps for pore-level geometric details and facilitates high-quality rendering in the form of albedo and specular reflectance maps. These high-quality assets are readily usable by production studios for avatar creation, animation and physically-based skin rendering. We demonstrate state-of-the-art geometric and correspondence accuracy, while only taking 0.385 seconds to compute a mesh with 10K vertices, which is three orders of magnitude faster than traditional techniques. The code and the model are available for research purposes at <a href='https://tianyeli.github.io/tofu' target='_blank'>here</a>
