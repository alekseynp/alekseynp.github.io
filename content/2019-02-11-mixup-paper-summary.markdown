author: Aleksey Nozdryn-Plotnicki
date: 2019-02-11 12:00:00+00:00
slug: mixup-paper-summary
title: Paper Summary: mixup: Beyond Empirical Risk Minimization
category: Deep Learning
---

## Introduction

This is summary of [mixup: Beyond Empirical Risk Minimization](https://arxiv.org/abs/1710.09412) for the [Vancouver Data Science Reading Group](https://www.meetup.com/LearnDataScience/). It was a poster paper at ICLR 2018. 

The paper authors are: Hongyi Zhang (MIT), Moustapha Cisse (FAIR), Yann N. Dauphin (FAIR), David Lopez-Paz (FAIR)

There's code!: [CIFAR10](https://github.com/facebookresearch/mixup-cifar10) and [more code from the authors](ttps://github.com/hongyi-zhang/mixup) and [TF code linked by the authors](https://github.com/tensorpack/tensorpack/tree/master/examples/ResNet#cifar10-preact18-mixuppy).

<br />
## Why should you care?
> mixup allows a new state-of-the-art performance in the CIFAR-10, CIFAR100, and ImageNet-2012 image classification datasets 

The only way practitioners think about doing classification in deep learning is by minimizing categorical cross entropy loss against one hot encoded vectors. This paper presents a viable alternative.

What is Empirical Risk Minimization?
The authors actually do a very good job of building up expected risk, empirical risk, and finally vicinal risk. They are actually quite generous to the reader and walk us through what is probably boring elementary theory for some research audiences.

The key takeaway here is that data augmentation isn’t just something that engineers do in order to make their data set feel bigger or something that you bolt on to your training loop. Data augmentation is actually a fundamental component of how we formulate our problem. There are other ways of formulating the problem whose implementations might look like data augmentation, and mixup is one of them.

<br />
## What is it?

### A Cheap Engineering Hack

Instead of training your model to output a class given a training example, randomly interpolate between two training examples and train your model to output the same interpolated class. In a CIFAR10 example, we might randomly draw a interpolation of 0.2. Take a photo of an airplane and a photo of an automobile and mix then 20%/80% pixel-wise on their RGB values. Compute your loss against a target out vector with a 20% probability for airplane and 80% for automobile. Done. Easy to do, if a bit bizarre to do with images.

Mixup gets better results and it is a drop-in replacement in normal training routine with nearly zero cost or complexity.

### A Wise Reformulation

In a classification problem we can think of our training data as being points in a high dimensional space. With mixup we re-formulate the problem so that our data is a fully connected graph where the vectors between training examples define the way in which our function outputs change.

<br />
## What is the impact?

We end up with a lot of training examples that would never arise in the real world, but we also gain access to a rich vicinity. Most of images that are 20% of the way from an automobile to an airplane are bizarre unnatural images or images with a little structured noise. However, almost all of those images should be classified as automobile (argmax([0.8, 0.2]) and some of those images may actually start to look a little like an airplane (maybe even 20%).

Interpolating spectrograms for audio classification like in their section 3.3 makes a whole lot more sense than images in sections 3.1 and 3.2.

They:

- Eek out small improvements in classification error in the ImageNet 2012 benchmark
- Improved classification error on CIFAR-10 and CIFAR-100 image classification benchmarks
- Show other interesting results, though not as comprehensive or compelling
    - Demonstrate the potential to improve spectrogram classification
    - Demonstrate frankly amazing resiliency to corrupted labels
    - Demonstrate curious increased resiliency to adversarial attacks with one very interesting exception.
    - Demonstrate improvements on tabular data
- Their GAN idea is nice, but their results are really weak and I don’t think worth discussing

### About Resiliency to Adversarial Attacks

I think the behaviour they demonstrate in Figure 2 makes their network *more* vulnerable to the white box iterative fast gradient sign method (I-FGSM) attack. This is not a criticism of their method, as white box attacks are not too concerning in practice. They do however mislead with their black box results, because they attack the ERM model and attempt to transfer to the mixup model. They should have also attacked a separately trained mixup model and attempted transfer to both.

<br />
## Big Obvious Question

Why not interpolate in feature space rather than input space? Surely it makes more sense to mix features with some potential semantic meaning rather than the pixels of an image? They address this essentially by trying it out in their ablation studies and surprisingly their choice leads to the best result.


