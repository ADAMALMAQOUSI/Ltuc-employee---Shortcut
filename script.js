// Employee Management System - CRUD Operations

// In-memory storage for employees
let employees = [];
let editingEmployeeId = null;

// DOM Elements
const employeeForm = document.getElementById('employee-form');
const employeeIdInput = document.getElementById('employee-id');
const employeeNameInput = document.getElementById('employee-name');
const employeeAddressInput = document.getElementById('employee-address');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const tableBody = document.getElementById('employee-table-body');
const employeeCount = document.getElementById('employee-count');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderEmployeeTable();
    updateEmployeeCount();
});

// Form Submit Handler
employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const employeeData = {
        id: employeeIdInput.value.trim(),
        name: employeeNameInput.value.trim(),
        address: employeeAddressInput.value.trim()
    };
    
    if (editingEmployeeId !== null) {
        // Update existing employee
        updateEmployee(editingEmployeeId, employeeData);
    } else {
        // Create new employee
        createEmployee(employeeData);
    }
    
    resetForm();
});

// Cancel Button Handler
cancelBtn.addEventListener('click', () => {
    resetForm();
});

// CREATE - Add new employee
function createEmployee(employeeData) {
    // Check if ID already exists
    const existingEmployee = employees.find(emp => emp.id === employeeData.id);
    
    if (existingEmployee) {
        alert('⚠️ Employee ID already exists! Please use a unique ID.');
        return;
    }
    
    employees.push(employeeData);
    renderEmployeeTable();
    updateEmployeeCount();
    showNotification('✅ Employee added successfully!', 'success');
}

// READ - Render employee table
function renderEmployeeTable() {
    tableBody.innerHTML = '';
    
    if (employees.length === 0) {
        tableBody.innerHTML = `
            <tr class="empty-state">
                <td colspan="4">
                    <div class="empty-message">
                        <span class="empty-icon">📋</span>
                        <p>No employees added yet. Start by adding your first employee!</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.classList.add('table-row-enter');
        row.innerHTML = `
            <td data-label="ID">${escapeHtml(employee.id)}</td>
            <td data-label="Name">${escapeHtml(employee.name)}</td>
            <td data-label="Address">${escapeHtml(employee.address)}</td>
            <td data-label="Actions">
                <div class="action-buttons">
                    <button class="btn-action btn-edit" onclick="editEmployee('${employee.id}')" aria-label="Edit employee">
                        ✏️ Edit
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteEmployee('${employee.id}')" aria-label="Delete employee">
                        🗑️ Delete
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// UPDATE - Edit employee
function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    
    if (!employee) {
        alert('❌ Employee not found!');
        return;
    }
    
    // Populate form with employee data
    employeeIdInput.value = employee.id;
    employeeNameInput.value = employee.name;
    employeeAddressInput.value = employee.address;
    
    // Disable ID field during edit
    employeeIdInput.disabled = true;
    
    // Update UI for edit mode
    editingEmployeeId = id;
    formTitle.textContent = 'Edit Employee';
    submitBtn.innerHTML = '<span class="btn-icon">💾</span> Update Employee';
    cancelBtn.style.display = 'inline-flex';
    
    // Scroll to form
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// UPDATE - Save updated employee
function updateEmployee(id, newData) {
    const index = employees.findIndex(emp => emp.id === id);
    
    if (index === -1) {
        alert('❌ Employee not found!');
        return;
    }
    
    // Update employee data (keep original ID)
    employees[index] = {
        id: id,
        name: newData.name,
        address: newData.address
    };
    
    renderEmployeeTable();
    showNotification('✅ Employee updated successfully!', 'success');
}

// DELETE - Remove employee
function deleteEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    
    if (!employee) {
        alert('❌ Employee not found!');
        return;
    }
    
    // Confirm deletion
    const confirmDelete = confirm(`Are you sure you want to delete employee "${employee.name}"?`);
    
    if (!confirmDelete) {
        return;
    }
    
    employees = employees.filter(emp => emp.id !== id);
    renderEmployeeTable();
    updateEmployeeCount();
    showNotification('✅ Employee deleted successfully!', 'success');
}

// Reset form to initial state
function resetForm() {
    employeeForm.reset();
    employeeIdInput.disabled = false;
    editingEmployeeId = null;
    formTitle.textContent = 'Add New Employee';
    submitBtn.innerHTML = '<span class="btn-icon">➕</span> Add Employee';
    cancelBtn.style.display = 'none';
}

// Update employee count badge
function updateEmployeeCount() {
    const count = employees.length;
    employeeCount.textContent = `${count} Employee${count !== 1 ? 's' : ''}`;
}

// Show notification (simple alert for now)
function showNotification(message, type) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
