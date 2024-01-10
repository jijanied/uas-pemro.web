let tasks = [];
let editingIndex = null;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        tasks.push({ text: taskText, done: false });
        updateTaskList();
        taskInput.value = '';
    }
}

function toggleTaskStatus(index) {
    tasks[index].done = !tasks[index].done;
    updateTaskList();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function editTask(index) {
    const taskToEdit = tasks[index];
    const editForm = document.getElementById('editForm');
    const editTaskInput = document.getElementById('editTaskInput');

    // Set nilai input formulir mengikuti tugas yang sedang diedit
    editTaskInput.value = taskToEdit.text;

    // Tampilkan formulir pengeditan
    editForm.style.display = 'block';

    // Simpan indeks tugas yang sedang diedit
    editingIndex = index;
}

function saveEditedTask() {
    const editTaskInput = document.getElementById('editTaskInput');

    // Periksa apakah tugas yang sedang diedit valid
    const editedText = editTaskInput.value.trim();
    if (editedText !== '') {
        // Terapkan perubahan ke tugas yang sedang diedit
        tasks[editingIndex].text = editedText;

        // Reset nilai dan sembunyikan formulir pengeditan
        editTaskInput.value = '';
        document.getElementById('editForm').style.display = 'none';

        // Perbarui daftar tugas
        updateTaskList();
    }
}

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span class="${task.done ? 'done' : 'task-text'}">${task.text}</span>
            <button onclick="toggleTaskStatus(${index})">${task.done ? 'Batal' : 'Selesai'}</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Hapus</button>
        `;
        // if (task.done) {
        //     listItem.classList.add('done');
        // }
        taskList.appendChild(listItem);
    });
}

// Tambahkan event listener untuk tombol "Edit"
document.getElementById('editButton').addEventListener('click', () => {
    const editForm = document.getElementById('editForm');
    const editTaskInput = document.getElementById('editTaskInput');

    // Sembunyikan formulir pengeditan
    editForm.style.display = 'none';

    // Reset nilai input formulir
    editTaskInput.value = '';
});


// Initial task list update
updateTaskList();
