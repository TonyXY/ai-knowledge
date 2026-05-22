---
title: "MoE"
description: "混合专家模型——多个专家子网络 + 门控路由，用较少计算量实现更大模型容量"
difficulty: advanced
---

# MoE

<DifficultyBadge level="advanced" />

## 一句话解释

MoE（Mixture of Experts，混合专家模型）是一种稀疏激活的模型架构，它由**多个"专家"子网络 + 一个门控路由机制**组成。每次前向传播时，路由器只激活其中少数几个专家，用较少的计算量实现了远大于自身的模型容量。DeepSeek-V3、Mixtral 8x7B 等明星模型均采用此架构。

## 通俗类比

想象一个大型医院有 100 位专科医生（专家），但每个病人来就诊时，不是找 100 位医生会诊（那样太慢太贵），而是由分诊台护士（门控路由）根据症状分配到最相关的 2~3 位医生。不同的病人会被分配给不同的医生组合。MoE 就是这种"按需激活"的思路——模型虽然庞大，但每次推理只激活一小部分参数，实现了"大模型的容量 + 小模型的速度"。

## 技术定义

MoE 架构的核心组件：

1. **专家网络（Experts）**：多个独立的前馈神经网络子模块。每个专家都有自己的参数，可以专注于不同类型的输入模式。例如有的专家擅长处理代词，有的擅长处理专业术语
2. **门控网络（Gating / Router）**：一个轻量级的分类器，输入一个 Token 的表示向量，输出每个专家的"适合度"分数。通过 Softmax 归一化后，选择 Top-K 个分数最高的专家来实际处理该 Token
3. **稀疏激活（Sparse Activation）**：关键特性——每个 Token 只激活 Top-K 个专家（通常 K=1 或 2），其余专家不参与计算。这意味着模型的总参数量可以极大（如 Mixtral 8x7B 共 47B 参数），但每次推理的活跃参数量只有 13B 左右

**负载均衡** 是 MoE 的最大挑战——如果路由器总是选择某几个"热门"专家，会导致计算资源浪费和训练不稳定。通常通过额外的辅助损失函数（Auxiliary Loss）来鼓励路由器均匀分配负载。

MoE 的代表模型：

| 模型 | 总参数量 | 活跃参数量 | 专家数 |
|------|---------|-----------|-------|
| Mixtral 8x7B | 46.7B | 12.9B | 8 |
| DeepSeek-V2 | 236B | 21B | 160 |
| DeepSeek-V3 | 671B | 37B | 256 |

## 关联术语

- [Transformer](/terms/transformer) —— MoE 通常用在 Transformer 的前馈网络（FFN）层替代标准的 Dense 层
- [参数](/terms/parameters) —— MoE 的总参数量可以极大，但推理时只计算活跃参数
- [训练 / 推理](/terms/training-inference) —— MoE 在推理效率上的优势最为显著

## 延伸阅读

- MoE 综述：[A Review of Sparse Expert Models in Deep Learning](https://arxiv.org/abs/2209.01667)
- Mixtral 技术报告：[Mixtral of Experts](https://arxiv.org/abs/2401.04088)
- DeepSeek-V3 技术报告：[DeepSeek-V3 Technical Report](https://arxiv.org/abs/2412.19437)
- 深入理解：先用单个 Dense 模型理解 Transformer FFN 层的作用，再看 MoE 如何把一层拆成多个专家。
