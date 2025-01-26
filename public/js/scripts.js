document.addEventListener('DOMContentLoaded', () => {
    const viewAssignmentsBtn = document.getElementById('viewAssignments');
    const createAssignmentBtn = document.getElementById('createAssignment');
    const submitAssignmentBtn = document.getElementById('submitAssignment');
    const gradeAssignmentBtn = document.getElementById('gradeAssignment');
    const formsSection = document.getElementById('forms');
    const createAssignmentForm = document.getElementById('create-assignment-form');
    const submitAssignmentForm = document.getElementById('submit-assignment-form');
    const gradeAssignmentForm = document.getElementById('grade-assignment-form');
    const assignmentsList = document.getElementById('assignments-list');

    // Show Create Assignment Form
    createAssignmentBtn.addEventListener('click', () => {
        formsSection.classList.remove('hidden');
        createAssignmentForm.classList.remove('hidden');
        submitAssignmentForm.classList.add('hidden');
        gradeAssignmentForm.classList.add('hidden');
    });

    // Show Submit Assignment Form
    submitAssignmentBtn.addEventListener('click', () => {
        formsSection.classList.remove('hidden');
        submitAssignmentForm.classList.remove('hidden');
        createAssignmentForm.classList.add('hidden');
        gradeAssignmentForm.classList.add('hidden');
    });

    // Show Grade Assignment Form
    gradeAssignmentBtn.addEventListener('click', () => {
        formsSection.classList.remove('hidden');
        gradeAssignmentForm.classList.remove('hidden');
        createAssignmentForm.classList.add('hidden');
        submitAssignmentForm.classList.add('hidden');
    });

    // Fetch and Display Assignments
    viewAssignmentsBtn.addEventListener('click', async () => {
        const response = await fetch('/student/assignments', {
            headers: {
                'X-Principal': JSON.stringify({ user_id: 1, student_id: 1 })
            }
        });
        const data = await response.json();
        assignmentsList.innerHTML = data.data.map(assignment => `
            <div class="assignment-card">
                <h3>${assignment.content}</h3>
                <p>State: ${assignment.state}</p>
                <p>Grade: ${assignment.grade || 'Not graded'}</p>
            </div>
        `).join('');
    });

    // Handle Create Assignment Form Submission
    createAssignmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const content = document.getElementById('content').value;
        const response = await fetch('/student/assignments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Principal': JSON.stringify({ user_id: 2, student_id: 2 })
            },
            body: JSON.stringify({ content })
        });
        const data = await response.json();
        alert('Assignment created successfully!');
        createAssignmentForm.reset();
    });

    // Handle Submit Assignment Form Submission
    submitAssignmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const assignmentId = document.getElementById('assignment-id').value;
        const teacherId = document.getElementById('teacher-id').value;
        const response = await fetch('/student/assignments/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Principal': JSON.stringify({ user_id: 1, student_id: 1 })
            },
            body: JSON.stringify({ id: assignmentId, teacher_id: teacherId })
        });
        const data = await response.json();
        alert('Assignment submitted successfully!');
        submitAssignmentForm.reset();
    });

    // Handle Grade Assignment Form Submission
    gradeAssignmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const assignmentId = document.getElementById('grade-assignment-id').value;
        const grade = document.getElementById('grade').value;
        const response = await fetch('/teacher/assignments/grade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Principal': JSON.stringify({ user_id: 3, teacher_id: 1 })
            },
            body: JSON.stringify({ id: assignmentId, grade })
        });
        const data = await response.json();
        alert('Assignment graded successfully!');
        gradeAssignmentForm.reset();
    });
});