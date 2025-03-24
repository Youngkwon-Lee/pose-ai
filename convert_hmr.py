import tensorflow as tf
import tensorflowjs as tfjs
import torch
import torch.nn as nn
import numpy as np
import os

# HMR 모델 클래스 정의
class HMR(nn.Module):
    def __init__(self):
        super(HMR, self).__init__()
        # HMR 모델 아키텍처 정의
        self.encoder = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(128, 256, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(256, 512, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Flatten(),
            nn.Linear(512 * 14 * 14, 2048),
            nn.ReLU(),
            nn.Linear(2048, 1024),
            nn.ReLU()
        )
        
        self.decoder = nn.Sequential(
            nn.Linear(1024, 2048),
            nn.ReLU(),
            nn.Linear(2048, 6890 * 3),  # 3D vertices
            nn.Tanh()
        )

    def forward(self, x):
        x = self.encoder(x)
        x = self.decoder(x)
        return x

def convert_hmr_to_tfjs():
    # PyTorch 모델 생성
    hmr_model = HMR()
    
    # 가중치 로드 (원본 HMR 모델의 가중치 파일 경로로 수정 필요)
    weights_path = 'public/models/hmr/weights.pth'
    if os.path.exists(weights_path):
        hmr_model.load_state_dict(torch.load(weights_path))
    else:
        print(f"Warning: Weights file not found at {weights_path}")
    
    # PyTorch 모델을 TensorFlow 모델로 변환
    tf_model = tf.keras.Sequential([
        tf.keras.layers.Conv2D(64, 3, padding='same', input_shape=(224, 224, 3)),
        tf.keras.layers.ReLU(),
        tf.keras.layers.MaxPooling2D(2),
        tf.keras.layers.Conv2D(128, 3, padding='same'),
        tf.keras.layers.ReLU(),
        tf.keras.layers.MaxPooling2D(2),
        tf.keras.layers.Conv2D(256, 3, padding='same'),
        tf.keras.layers.ReLU(),
        tf.keras.layers.MaxPooling2D(2),
        tf.keras.layers.Conv2D(512, 3, padding='same'),
        tf.keras.layers.ReLU(),
        tf.keras.layers.MaxPooling2D(2),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(2048),
        tf.keras.layers.ReLU(),
        tf.keras.layers.Dense(1024),
        tf.keras.layers.ReLU(),
        tf.keras.layers.Dense(2048),
        tf.keras.layers.ReLU(),
        tf.keras.layers.Dense(6890 * 3),
        tf.keras.layers.Activation('tanh')
    ])
    
    # 가중치 변환 및 복사
    for i, layer in enumerate(hmr_model.encoder):
        if isinstance(layer, nn.Conv2d):
            weights = layer.weight.data.numpy()
            weights = np.transpose(weights, (2, 3, 1, 0))
            tf_model.layers[i].set_weights([weights, layer.bias.data.numpy()])
        elif isinstance(layer, nn.Linear):
            weights = layer.weight.data.numpy()
            weights = np.transpose(weights)
            tf_model.layers[i].set_weights([weights, layer.bias.data.numpy()])
    
    # TensorFlow.js 모델로 저장
    output_path = 'public/models/hmr'
    if not os.path.exists(output_path):
        os.makedirs(output_path)
    
    tfjs.converters.save_keras_model(tf_model, output_path)
    print(f"Model converted and saved to {output_path}")

if __name__ == '__main__':
    convert_hmr_to_tfjs() 