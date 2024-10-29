## Splitting the images & labels into training and validation sets

import os
import shutil
from sklearn.model_selection import train_test_split

# img paths
imgs_path = 'C:\TUD_MSC\sem_3\Magpie_mc\dataset_ann\images'
img_train_path = os.path.join(imgs_path, 'train')
img_val_path = os.path.join(imgs_path, 'val')
# label paths
labels_path = 'C:\TUD_MSC\sem_3\Magpie_mc\dataset_ann\labels'
label_train_path = os.path.join(labels_path, 'train')
label_val_path = os.path.join(labels_path, 'val')


# create dirs for train & validation
for path in [img_train_path, img_val_path, label_train_path, label_val_path]:
    os.makedirs(path, exist_ok=True)

# list all images + filter out any non-img files
imgs = os.listdir(imgs_path)
imgs = [img for img in imgs if img.endswith(('.jpg', '.png', '.jpeg'))]

# split train - validation (80-20)
train_img, val_img = train_test_split(imgs, test_size=0.2, random_state=21)

# function to move images & corresponding labels to dirs
def move_img_label(image, src_img_dir, src_label_dir, dest_img_dir, dest_label_dir):
    # move img
    shutil.move(os.path.join(src_img_dir, image), os.path.join(dest_img_dir, image))
    # move matching label
    label_name = os.path.splitext(image)[0] + '.txt'
    label_path = os.path.join(src_label_dir, label_name)
    if os.path.exists(label_path):
        shutil.move(label_path, os.path.join(dest_label_dir, label_name))

# move imgs & labels
for img in train_img:
    move_img_label(img, imgs_path, labels_path, img_train_path, label_train_path)

for img in val_img:
    move_img_label(img, imgs_path, labels_path, img_val_path, label_val_path)

# check if action successfull
if all(len(os.listdir(p)) == len(img) for p, img in zip([img_train_path, img_val_path], [train_img, val_img])):
    print("Action successful: images and labels split into training & validation sets!")
else:
    print("Error: something went wrong pookie.")
