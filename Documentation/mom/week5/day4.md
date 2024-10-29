# Minutes of the Meeting (MoM) - Week 5 - Day 4

**Project Title:** Magpie - Services at a Glance

**Group Members:** Kaustubh, Saul, Andreas, Jessica, Anais, Yuanshuo Du (Steven)

**Date:** 17th October 2024

**Time:** 12:35 PM

**Location:** Online (Dublin, Ireland)

---

### **1. Attendance**

- **Present:**
  - Kaustubh
  - Jessica
  - Andreas
  - Steven
  - Anais
  - Saul

---

### **2. Agenda of the Meeting**

- Review task progress from yesterday.
- Discuss labeling updates and model integration.
- Plan for interim submissions and upcoming presentations.

---

### **3. Discussion and Key Points**

1. **Task Updates:**

   - **Saul:** Assisted Anais with tracking data and updated the build actions to sanitize input. Worked on several Git housekeeping tasks, including separating `.gitignore` files for different root directories. He will continue working on integrating Andreas' technology into the other Git actions and begin work on the presentation today.
   - **Anais:** Worked on tuning the model with Saul and hopes to complete training the model and labeling the remaining images today.
   - **Steven:** Tested and fixed the login function after a call with Andreas. The login now works properly, returning a token. However, there are issues with routing in Next.js that Steven will work on, with Kaustubh's help, after today's meeting. He will also finish the UI prototypes later tonight.
   - **Andreas:** Fixed the login bug in the back end and started working on unit testing. Set up GitHub actions for testing, which will be completed by the afternoon.
   - **Jessica:** Started working on the parking detection script, successfully identifying cars in multiple parts of images. Updated the masks and is now working on extracting coordinates from bounding boxes for further processing.

2. **Labeling and Model Integration:**

   - Jessica and Anais discussed the progress of parking detection and labeling the images. They are working towards integrating the trained YOLOv8 model and ensuring that it correctly identifies and processes coordinates for further use.

3. **Presentation and Interim Submission:**

   - The team discussed the interim submission due next week and the need for a demo showing the project’s potential. Kaustubh and Andreas suggested using dummy data if the real data isn't ready in time, ensuring the project appears functional for the demo.
   - The current plan is to feature Jessica’s parking detection in the presentation, even if real data isn’t fully integrated by next week.

4. **Next Steps for Development:**
   - Andreas and Steven will hop on a call to fix remaining issues with login routing.
   - Jessica and Anais will continue working on extracting coordinates of the bounding boxes found and completing training and tuning.
   - Kaustubh will work on logic for displaying data points in the front end, including UI elements for showing the number of parking spaces in a radius.

---

**Date:** 17th October 2024
