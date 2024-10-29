import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, datasets, transforms
from torch.utils.data import DataLoader

model = torch.hub.load('ultralytics/yolov5', 'custom', path='yolov5/runs/train/exp3/weights/best.pt', force_reload=True)

#initial attempt at modifying the final layer, it isn't possible due to the structure of the layers and how they
#are encapsulated, TypeError: 'DetectionModel' object is not subscriptable
num_classes = 2 

detect_layer = None
for layer in model.model.model:
    if isinstance(layer, torch.nn.ModuleList) and isinstance(layer[0], torch.nn.Conv2d):
        detect_layer = layer
        break

if detect_layer:
    in_channels = detect_layer[0].in_channels 
    new_conv = torch.nn.Conv2d(in_channels, num_classes * 3, kernel_size=(1, 1), stride=(1, 1))
    
    detect_layer[-1] = new_conv
else:
    print("Detect layer not found.")
