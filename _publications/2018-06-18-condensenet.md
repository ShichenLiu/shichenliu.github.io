---
layout: default

paper-title: 'CondenseNet: An Efficient DenseNet using Learned Group Convolutions'
authors: Gao Huang*, <u>Shichen Liu</u>*, Laurens van der Maaten, Kilian Q. Weinberger

conference: IEEE Conference on Computer Vision and Pattern Recognition
conference-brief: CVPR
year: 2018
award: spotlight

link: https://arxiv.org/abs/1711.09224
code: https://github.com/ShichenLiu/CondenseNet
talk: https://www.youtube.com/watch?v=NHajBzgnC1Q&t=87m50st

img: /assets/images/learned_conv.png
---

The high accuracy of convolutional networks (CNNs) in visual recognition tasks, such as image classification, has fueled the desire to deploy these networks on platforms with limited computational resources, e.g., in robotics, self-driving cars, and on mobile devices. Unfortunately, the most accurate deep CNNs, such as the winners of the ImageNet and COCO challenges, were designed without taking strict compute restrictions into consideration. As a result, these models cannot be used to perform real-time inference on low-compute devices.