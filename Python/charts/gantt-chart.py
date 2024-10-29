from datetime import datetime
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('TkAgg')

# Define the task data
tasks = [
    {"Task": "Group finalization and Project Initialization",
        "Start": "16-09-2024", "End": "22-09-2024", "Duration": 7},
    {"Task": "Project Planning and \n Project Setup (Frontend and Backend)",
        "Start": "20-09-2024", "End": "29-09-2024", "Duration": 7},
    {"Task": "Data Gathering, Frontend Map setup ,\nBackend Routes implementation ",
        "Start": "30-09-2024", "End": "06-10-2024", "Duration": 7},
    {"Task": "Labelling, Distribution,\n Backend Auth Routes implementation", "Start": "07-10-2024",
        "End": "13-10-2024", "Duration": 7},
    {"Task": "UI/UX Documentation, Inital Model Training, \nSecuring the Backend ",
        "Start": "11-10-2024", "End": "20-10-2024", "Duration": 7},
    {"Task": "Interim Project Demo, and report", "Start": "21-10-2024",
        "End": "27-10-2024", "Duration": 7},
    {"Task": "Future features planning", "Start": "28-10-2024",
        "End": "03-11-2024", "Duration": 7},
    {"Task": "System Enhancement", "Start": "04-11-2024",
        "End": "10-11-2024", "Duration": 7},
    {"Task": "User System Evaluation", "Start": "11-11-2024",
        "End": "17-11-2024", "Duration": 7},
    {"Task": "Backend Valdiation and Testing",
        "Start": "18-11-2024", "End": "24-11-2024", "Duration": 7},
    {"Task": "Code cleaning and identifying code smells",
        "Start": "25-11-2024", "End": "01-12-2024", "Duration": 7},
    {"Task": "Integration Tests and Beta Testing", "Start": "02-12-2024",
        "End": "08-12-2024", "Duration": 7},
    {"Task": "Final Demo", "Start": "09-12-2024",
        "End": "15-12-2024", "Duration": 7},
    {"Task": "Final Report", "Start": "16-12-2024",
        "End": "22-12-2024", "Duration": 7},
    # {"Task": "Task 15", "Start": "23-12-2024", "End": "29-12-2024", "Duration": 7},
    # {"Task": "Task 16", "Start": "30-12-2024", "End": "05-01-2025", "Duration": 7},
]

# Parse the date strings into datetime objects
for task in tasks:
    task['Start'] = datetime.strptime(task['Start'], "%d-%m-%Y")
    task['End'] = datetime.strptime(task['End'], "%d-%m-%Y")

# Sort tasks by start date (optional, since they are already in order)
tasks = sorted(tasks, key=lambda x: x['Start'], reverse=True)

# Create a figure and a set of subplots
fig, ax = plt.subplots(figsize=(12, 8))

# Assign a y-position for each task
y_positions = range(len(tasks))

# Create the Gantt bars
for i, task in enumerate(tasks):
    start_date = mdates.date2num(task['Start'])
    end_date = mdates.date2num(task['End'])
    duration = end_date - start_date
    ax.barh(i, duration, left=start_date, height=0.4,
            align='center', edgecolor='black', color='skyblue')

# Set the y-axis labels to task names
ax.set_yticks(y_positions)
ax.set_yticklabels([task['Task'] for task in tasks])

# Format the x-axis with date labels
ax.xaxis_date()
date_format = mdates.DateFormatter('%d-%m-%Y')
ax.xaxis.set_major_formatter(date_format)

# Rotate date labels for better readability
plt.xticks(rotation=45)

# Add grid to the chart
ax.grid(True)

# Set labels and title
plt.xlabel('Date')
plt.ylabel('Tasks')
plt.title('Gantt Chart')

# Adjust layout to fit everything nicely
plt.tight_layout()

# Display the Gantt chart
# plt.show()
plt.savefig('gantt_chart.png')
