# Minutes of the Meeting (MoM) - Week 5 - Day 3

**Project Title:** Magpie - Services at a Glance

**Group Members:** Kaustubh, Saul, Andreas, Jessica, Anais, Yuanshuo Du (Steven)

**Date:** 16th October 2024

**Time:** 12:32 PM

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

- Update on yesterday’s work and today’s plans.
- Discussion on GitHub updates, labeling improvements, and user personas.
- Address challenges with sign-up and login functionality.

---

### **3. Discussion and Key Points**

1. **Task Updates:**

   - **Saul:** Focused on integrating Jessica and Anais' work into GitHub using a Git submodule. Set up a script for compressing and pushing dataset images and implemented Renovate for checking repository updates. Plans to refine Renovate rules and assist Anais with model training today.
   - **Kaustubh:** Worked on user personas and a mind map, both of which have been pushed to Git. He shared a link in the general channel for feedback and additional points. Currently working on user journeys and plans to finish user journeys and sitemap today.
   - **Anais:** Contributed to the mind map and finalized the YOLOv8 model script. Compiled a list of people to send the survey to and will push the list to GitHub soon.
   - **Andreas:** Completed a pull request for better error handling in the back end. He is currently investigating issues with the login functionality and will start on unit testing for the back end later today.
   - **Steven:** Tested the sign-up and login functions, but encountered an issue with login that requires Andreas' help. He added protected routes for authentication pages and implemented local storage to track user status. Plans to finish the authentication function and continue sketching UI designs.
   - **Jessica:** Worked on improving the model and initially planned for transfer learning, but is now focusing on hyperparameter tuning. She will continue training the model and working with Anais to fine-tune it.

2. **Renovate and GitHub Improvements:**

   - Renovate has been set up to check repositories for updates and create pull requests for merging them. Team members are asked to review and approve relevant PRs.
   - Two PRs were approved, with one failure in ESLint requiring further investigation.

3. **Front-End and Back-End Integration:**

   - Andreas and Steven discussed issues with login functionality. The protected routes for authentication and local storage tracking have been implemented, but further testing is needed to resolve remaining issues.

4. **Survey and Documentation:**
   - Anais is compiling a list for survey distribution, and Kaustubh shared the user personas and mind map for feedback.
   - The team plans to finalize the user journeys and sitemap today.
