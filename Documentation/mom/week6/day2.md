# Minutes of the Meeting (MoM) - Week 6 - Day 2

**Project Title:** Magpie - Services at a Glance

**Group Members:** Kaustubh, Saul, Andreas, Jessica, Anais, Yuanshuo Du (Steven)

**Date:** 22nd October 2024

**Time:** 12:36 PM

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

- Review the progress on tasks from the previous day.
- Discuss integration of machine learning and map markers.
- Finalize interim report contributions.

---

### **3. Discussion and Key Points**

1. **Task Updates:**

   - **Kaustubh:** Worked on converting the map's rectangle to a circle and ensured the correct measurements were applied based on the globe's longitude. He committed and merged the changes, and today he will be working on integrating with the backend APIs.
   - **Andreas:** Started changing the backend route to accept circle inputs for distance measurements. He faced issues with discrepancies between PostGIS and Google Maps distance measurements. He is continuing to work on resolving this issue today and also worked on the report with Saul.
   - **Saul:** Focused primarily on the report yesterday and will continue working on it today.
   - **Steven:** Reviewed articles Kaustubh sent about Next.js and refactored parts of the authentication process. He plans to complete the authentication work by tomorrow and will help with the report afterward.
   - **Jessica:** Worked on running points to the backend and resolved some issues with mapbox’s Street View road mask. She is experimenting with edge detection using different `cv2` functions to improve performance.
   - **Anais:** Re-labeled 250 images after realizing that rotated bounding boxes would better fit the cars. She retrained the YOLO model, and the accuracy improved. Today, she will complete labeling the rest of the images and continue model training. She also sent follow-up emails to Andrea and Damien, awaiting permission to send the survey to the mailing list.

2. **Machine Learning and Integration:**

   - **Jessica** and **Anais** discussed running additional iterations on the YOLO model to improve detection and will finalize the integration with the backend. Jessica will need Saul’s help for one last model run.

3. **Interim Report:**

   - Kaustubh requested that everyone begin adding their contributions to the interim report. He emphasized the importance of writing technical sections (machine learning, front-end) for the report as it needs to be sent by tonight. Saul and Andreas will coordinate on finalizing the report, and the rest of the team will provide 200-300 word descriptions of their work.
   - **Steven** and **Kaustubh** were asked to provide a summary of their work on the front-end and technical solution, while **Jessica** and **Anais** will focus on machine learning contributions.

4. **Frontend and Backend Integration:**

   - Kaustubh is working with the assumption that the data exists in the database, but Jessica suggested adding sample data for testing map markers.
   - The team discussed the need to ensure they do not exceed Mapbox’s API request limit, but they are currently well below the threshold.

5. **Additional Challenges:**
   - **Andreas** raised an issue about discrepancies in distance calculations between Google Maps and PostGIS, noting that further investigation is required to resolve it.
   - The team will work on fine-tuning the coordinate system for more accurate results.

---

**Date:** 22nd October 2024
