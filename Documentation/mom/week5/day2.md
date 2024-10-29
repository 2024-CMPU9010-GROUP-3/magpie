# Minutes of the Meeting (MoM) - Week 5 - Day 2

**Project Title:** Magpie - Services at a Glance

**Group Members:** Kaustubh, Saul, Andreas, Jessica, Anais, Yuanshuo Du (Steven)

**Date:** 15th October 2024

**Time:** 12:33 PM

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
- Discuss updates on labeling and UI/UX design.
- Review front-end and back-end integration issues.

---

### **3. Discussion and Key Points**

1. **Task Updates:**

   - **Saul:** Focused on setting up Renovate, a tool that automates updates for containers, distributions, and dependencies. This will make PRs when updates are needed. Saul will continue fine-tuning Renovate today and move on to JamDraw tasks afterward.
   - **Anais:** Worked on fine-tuning the auto-labeling model, currently achieving 86% accuracy but aiming for 90%. Also expressed concern about UI/UX mockups for the survey, as none have been completed yet. Kaustubh will help provide dashboard screenshots for the survey.
   - **Jessica** The approach using tensorflow was not working, so she wrote a diiferent notebook to implement transfer learning in pytorch instead.
   - **Kaustubh:** Mentioned that no UI/UX mockups have been created yet, but dashboard elements could be used in the survey. He will send screenshots of the current dashboard to Jessica later today. He also offered to assist with UI/UX after fine-tuning the model.
   - **Steven:** Tested the authentication system and encountered issues with errors during login. He will continue working on fixing the error today and suggested using Figma for collaborative UI/UX design.
   - **Andreas:** Completed implementing authentication for routes and is working on documentation. His next task will involve error handling for the back-end system, ensuring that proper error messages are sent to the front end instead of generic HTTP status codes.

2. **Labeling and Model Training:**

   - Anais continued fine-tuning the YOLOv8 model. She plans to finalize the current model training so that Jessica can begin working on transfer learning with an actual saved model and it's weights.
   - Hyperparameter tuning is also in progress, and there was a discussion about how to structure the machine learning container for deployment.

3. **Front-End and Back-End Integration:**

   - Andreas and Steven are working on fixing issues with the login function. Steven identified a 500 error during testing, which could be due to the environment variables not being set correctly.
   - Andreas suggested checking server logs to diagnose the error further.

4. **UI/UX and Figma Collaboration:**
   - Steven set up Figma for team collaboration, encouraging team members to share their ideas. He outlined the process of designing wireframes and prototypes using the platform.
   - Kaustubh and Jessica will finalize the dashboard screenshots for use in the survey, and Steven will continue working on low, medium, and high-fidelity prototypes.
