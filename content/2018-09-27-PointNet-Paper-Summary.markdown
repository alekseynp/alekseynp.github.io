author: Aleksey Nozdryn-Plotnicki
date: 2018-09-27 12:00:00+00:00
slug: pointnet-paper-summary
title: Paper Summary: PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation
category: Deep Learning
---

<style>
	.MathJax {
		font-size: 1em;
	}
</style>

## Introduction

This is summary of [PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation](https://arxiv.org/abs/1612.00593) for the [Vancouver Data Science Reading Group](https://www.meetup.com/LearnDataScience/)

The paper authors are: Charles R. Qi, Hao Su, Kaichun Mo, Leonaidas J. Guibas

There's code!: [https://github.com/charlesq34/pointnet](https://github.com/charlesq34/pointnet)

There's a lot going on in this paper. I highlight the most important parts below:

1. Deep Learning on Unordered Sets

2. Point Clouds

3. Architecture

4. Implementation

5. Why does it work on point clouds?

6. Other Comments


## Deep Learning on Unordered Sets

**This is a powerful idea that is useful for anyone working in Machine Learning, not at all limited to point clouds or computer vision applications.**

In ML we should be very familiar with learning a function $f(x)\rightarrow y$ that takes some vector $x$ and creates a desired output $y$, be it a regression task or a classification task. But what about a function on a set $f(\left \{x_1,x_2,...,x_n\right \})\rightarrow y$? The critical detail is that this function should be invariant to permutations of its inputs, $f(\left \{x_1,x_2,...,x_n\right \})= f(\left \{x_n,x_2,...,x_1\right \})$, because indeed the set's meaning has not changed.

A typical ML paradigm expects a single vector input. Your options are:

1. Sort input into a canonical order. Invent some ordering and concatenate the vectors to a single $x$. This is clearly suboptimal as our model will not understand the shared nature of elements of $x$ and will treat each as a unique feature.

2. Augment the training data with all kinds of permutations. This is an ugly hack, and utterly impossible if the set is large.

3. The author's approach.


The idea is to:

1. Create an $h(x)$ and apply it to every element of the set.

2. Apply a symmetric function $g(h(x_1),h(x_2),...,h(x_n))\rightarrow y$. The magically simple fact is that *mean* and *max* are symmetric functions, and therefore `max_pool` and `average_pool` are symmetric functions.

The "Deep Learning" comes in when the authors implement the $h()$ as a multi-layer perceptron (deep neural network) and implement $g()$ as a `max` followed by another multi-layer perceptron.

Why this works on point clouds is hard to wrap your head around. Suppose instead we wanted to take a team of developers and predict if they are likely to ship a release on time. We apply $h()$ to each developer to compute a feature vector $h(x_i)$ that describes the developer. If we apply a feature-wise `max` across the feature vectors, we get a single feature vector signature for the development team that did not depend on the set order. Finally we process that team feature to make our final prediction. $g(max(\left \{h(x_1),h(x_2),...,h(x_n)\right \}))\rightarrow y$.

In the Zillow Kaggle competition I experimented with PointNets. When predicting the value of a house, we could use statistical aggregate metrics about the neighbourhood it falls in, but we could also consider the k nearest houses as an unordered set that we could use to make predictions from. In a sense, the statistical measures like mean, median, standard deviation, etc. are engineered features and a DNN learning on the set has a chance of learning its own features. That may sound esoteric, but it is the classic story when using DNNs for computer vision applications vs. how those tasks were solved in the past.


## Point Clouds

Classifying 2D images has been done to death, but what about 3D data? Most of the 3D graphics we see in everyday life are triangular meshes. Millions of triangles rendered on a screen to make your video game or movie. However, the typical data format that comes from a 3D sensor is a point cloud. Some kind of sensor measures the 3D environment and generates an unordered list of $(x, y, z)$ coordinates. If you look at the raw data it doesn't look like much, but if you did a `plot3d` on it, you would be able to see it and guess what it is.

In particular the authors run experiments on *ModelNet40* a benchmark dataset not unlike CIFAR-10 or CIFAR-100. The native data format for ModelNet40 is actually a triangular mesh, so converting it to point clouds is a little artificial, but it makes for a worthwhile benchmark to do research against. The authors achieve very good results on the benchmark with their approach.

## Architecture

Their architecture is at the top of page 3. For a first time reader of this paper, the "input transform" and "feature transform" from the "joint alignment networks" are best ignored and not important. They contribute very little to performance in the end. One should also understand the classification case before studying the segmentation.

The basic classification architecture is:

1. Input points of shape `(n, 3)`.

2. MLP fully connected deep neural network with sizes 64, 64, 64, 128, 1024 applied to each point individually mapping $R^3\rightarrow R^{1024}$

3. Max pool from shape `(n, 1024)` to a feature vector of shape `(1024,)` 

4. MLP fully connected with size 512, 256, k where k is the number of classes mapping $R^{1024}\rightarrow R^k$

## Implementation

It's worth seeing their clever implementation [here](https://github.com/charlesq34/pointnet/blob/master/models/pointnet_cls.py)

1. An input batch is prepared as an "image" of shape `(batch_size, 1, n, 3)` (channels first notation)

2. A 2D convolution with 64 kernels of size `(1, 3)` with no padding is applied. This is equivalent to applying the same 64 neuron hidden layer to every row of the "image" or in fact the same 64 neuron hidden layer to every point in the cloud. The output is of shape `(batch_size, 64, n, 1)` or an "image" with 64 channels, 1 pixel wide and n pixels tall.

3. After that 2D convolutions with filters 64, 64, 128, and 1024 of size `(1,1)` process every point individually. The net effect is that the same MLP(64, 64, 64, 128, 1024), our $h()$ is applied to every point.

4. Finally a global max pool reduces `(batch_size, 1024, n, 1)` to `(batch_size, 1024)` and fully connected layers are used for classification.

You could also implement this as 1D convolutions starting with a input of shape `(batch_size, 3, n)` (channels first notation) and indeed I do in my own work.

## Why does it work on point clouds?

Each of the 1024 output features from the $h()$ can be thought of as point detectors. These numbers are derived only from 3 inputs! Some of these feature are excited by points that are very far from the origin. Some are excited by points below the origin. Some are excited by points in an arc in front of the origin. Before the max pool, each input point has excited some of the feature space elements, and after the max pool we have a summary of how the point cloud excited the features. A summary of where the points are.

Maybe the visualizations in figure 19 on page 15 would help.

## Other Comments

### Extensions

The major limitation of their architecture is that it makes no use of local structure and cannot learn hierarchical features. There is a [
PointNet++: Deep Hierarchical Feature Learning on Point Sets in a Metric Space](https://arxiv.org/abs/1706.02413) that is worth looking up.

### Comparison to VoxNet

Why, in Supplementary B, do they make a point of demonstrating their superior robustness vs. VoxNet?

Voxels are an alternative approach for classifying 3D objects. In the case of ModelNet40, the triangular meshes are converted to a 3D grid where each cell in the grid is occupied or not. Think about converting the 3D models to LEGO. After that, 3D CNNs can be applied in an analogous way to how 2D CNNs are applied for image classification. Converting the ModelNet40 triangular meshes to point clouds for this paper was an unfortunate necessity, but it's worth noting that voxel based approaches are also inelegant. Ultimately we should strive to process data in its native format. In the case of voxels, they are complete garbage if your input data is a sparse point cloud, or a point cloud that is in places sparse. This is because a sparse pount cloud converted to a voxel grid will provide only a few occupied cells. A 3DNN will then be mostly convolving across zeros and will struggle to learn anything. It's worth noting that this sparseness is actually a *very* common phenomenon in real world point clouds. They tend to be stupidly dense in some areas and frustratingly sparse in others as a consequence of the technology that gathers them.

### Effect of Bottleneck Dimension and Number of Input Points

The Supplementary F section is interesting to a practitioner and figure 15 in particular:

- They achieve incredible performance with only 64 input points. A human looking at a `Plot3D` with only 64 points would struggle to classify the objects. In that sense, this network is superhuman.

- It is important that the feature size be relatively large. The "bottleneck size" that is generally presented as 1024 in the architecture. The PointNet is roughly equivalent to a 7 layer CNN operating on a 32x32x3 image. 1024 would be very large in that case. This highlights the brute force nature of this architecture and the lack of local structure/hierarchical feature exploitation. The message for a practitioner is to make this layer larger than you might otherwise.

