# Minutes of the Meeting (MoM) - Week 3 - Day 4

**Project Title:** Magpie - Services at a Glance

**Group Members:** Kaustubh, Saul, Andreas, Jessica, Anais, Yuanshuo Du (Steven)

**Date:** 10th October 2024

**Time:** 12:35 PM

**Location:** Online (Dublin, Ireland)

---

### **1. Attendance**

- **Present:**
  - Jessica
  - Andreas
  - Steven
  - Anais
  - Saul
- Absent:
  - Kaustubh (Sick)

---

### **2. Agenda of the Meeting**

- Discuss progress on manual labeling and model training.
- Address presentation preparation for the upcoming demo.
- Plan tasks for finalizing the presentation and weekly diaries.

---

### **3. Discussion and Key Points**

1. **Manual Labeling and Model Training:**
   - Jessica reported slow progress on manual labeling due to the high number of cars in some images. She also experimented with different models but did not achieve good results.
   - Anais retrained the YOLO model using 200 images previously labeled by Jessica, which resulted in an 84% accuracy rate in identifying cars. This was a significant improvement.
   - The team discussed the need for additional background images (without cars) to reduce false positives. Jessica will add more such images to the dataset.

2. **Model Training Adjustments:**
   - The team highlighted the importance of retraining the YOLO model using images relevant to the project, rather than relying on pre-trained models not suited for satellite imagery.
   - Adjustments to training and validation datasets were proposed, with Saul suggesting a balanced mix of images containing cars and background-only scenes.
   - Anais shared plans to refine the training approach by tweaking model parameters and data distribution for better accuracy.

3. **Presentation Planning:**
   - The team discussed adopting a less formal presentation style, similar to other groups, and focusing on demonstrating recent progress directly from GitHub or notebooks.
   - Saul suggested using PowerPoint instead of LaTeX for slides, with plans to share a collaborative link for adding content.
   - The group decided to prioritize completing their weekly diaries before working on the presentation slides, as the submission deadline was approaching.

4. **Task Assignments for Presentation Preparation:**
   - Anais volunteered to start the presentation after finishing her weekly diary, using PowerPoint. The slides will be available for all members to contribute.
   - Steven will work on enhancing the front-end interface, including login responsiveness and adding pages for terms and privacy policies.
   - Saul continued to work on Kubernetes deployment, addressing compatibility issues and restructuring the setup for the project.

5. **Next Steps for Development:**
   - Each member will finalize their weekly diaries and contribute to the presentation slides.
   - Further testing and fine-tuning of the YOLO model will continue, with a focus on balancing the dataset for optimal results.

---

### **6. Next Meeting**

- **Date:** 11th October 2024
- **Time:** TBD
- **Location:** In-Person
- **Agenda:** Presentation postmortem and project review.

---

**Date:** 10th October 2024
