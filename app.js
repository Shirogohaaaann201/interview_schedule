// --- 簡易パスワード認証 ---
const AUTH_PASSWORD = "admin"; // 実際の運用に合わせて変更してください

const authBtn = document.getElementById('auth-btn');
const authInput = document.getElementById('auth-input');
const authOverlay = document.getElementById('auth-overlay');
const mainContent = document.getElementById('main-content');
const authError = document.getElementById('auth-error');

authBtn.addEventListener('click', () => {
  if (authInput.value === AUTH_PASSWORD) {
    authOverlay.style.display = 'none';
    mainContent.style.display = 'flex';
    initApp();
  } else {
    authError.style.display = 'block';
  }
});

authInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') authBtn.click();
});

// --- アプリケーションロジック ---
let currentDate = new Date(); // 現在表示中のカレンダーの月

function initApp() {
  renderCalendar(currentDate);
  renderResultsTable();
}

// ==========================================
// カレンダー描画処理
// ==========================================
function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11
  
  document.getElementById('current-month').textContent = `${year}年 ${month + 1}月`;
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDay.getDay(); // 0(Sun) - 6(Sat)
  
  const grid = document.getElementById('calendar-grid');
  grid.innerHTML = '';
  
  // 曜日ヘッダー
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  days.forEach(d => {
    const div = document.createElement('div');
    div.className = 'calendar-day-header';
    div.textContent = d;
    grid.appendChild(div);
  });
  
  // 前月の空白セル
  for (let i = 0; i < startDayOfWeek; i++) {
    const div = document.createElement('div');
    div.className = 'calendar-cell other-month';
    grid.appendChild(div);
  }
  
  // 当月の日付セル
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const div = document.createElement('div');
    div.className = 'calendar-cell';
    
    // 日付の数字
    const dateNum = document.createElement('div');
    dateNum.className = 'date-num';
    dateNum.textContent = d;
    div.appendChild(dateNum);
    
    // イベント（試験・面接予定）の描画
    // 日付文字列を 'YYYY-MM-DD' 形式にする
    const cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    
    appData.exams.forEach(exam => {
      // 日付が一致していればセルに予定を追加
      if (exam.date.startsWith(cellDateStr)) {
        const student = appData.students.find(s => s.id === exam.studentId);
        const eventEl = document.createElement('div');
        eventEl.className = 'event-item';
        
        // 結果に応じた色分けクラスを付与
        if (exam.status === '合格') eventEl.classList.add('status-passed');
        if (exam.status === '不合格' || exam.status === '辞退') eventEl.classList.add('status-failed');
        
        const time = exam.date.includes('T') ? exam.date.split('T')[1] : '';
        const studentName = student ? student.name : '不明な学生';
        
        eventEl.innerHTML = `<strong>${studentName}</strong><br>${exam.examName}<br><span style="color:var(--muted); font-size:0.8rem;">${exam.stage}${exam.examContent ? '（' + exam.examContent + '）' : ''} ${time}</span>`;
        div.appendChild(eventEl);
      }
    });
    
    grid.appendChild(div);
  }
  
  // 翌月の空白セル（グリッドを埋めるため）
  const totalCells = startDayOfWeek + lastDay.getDate();
  const remainingCells = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < remainingCells; i++) {
    const div = document.createElement('div');
    div.className = 'calendar-cell other-month';
    grid.appendChild(div);
  }
}

// カレンダーの月切り替えイベント
document.getElementById('prev-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

document.getElementById('next-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// ==========================================
// 学生ごとの結果一覧テーブル描画処理
// ==========================================
function renderResultsTable() {
  const tbody = document.querySelector('#results-table tbody');
  tbody.innerHTML = '';
  
  appData.students.forEach(student => {
    // この学生の全試験履歴を取得
    const studentExams = appData.exams.filter(e => e.studentId === student.id);
    
    // 受験履歴がない場合はスキップ（表示しない）
    if (studentExams.length === 0) return;
    
    const tr = document.createElement('tr');
    
    // 学籍番号
    const tdId = document.createElement('td');
    tdId.textContent = student.id;
    tdId.style.fontFamily = 'monospace';
    tdId.style.color = 'var(--muted)';
    tr.appendChild(tdId);
    
    // 氏名
    const tdName = document.createElement('td');
    tdName.textContent = student.name;
    tdName.style.fontWeight = '600';
    tr.appendChild(tdName);
    
    // 受験情報リスト
    const tdInfo = document.createElement('td');
    
    // 日付順にソート（古いものが上、新しいものが下）
    studentExams.sort((a, b) => a.date.localeCompare(b.date));
    
    studentExams.forEach(exam => {
      const infoDiv = document.createElement('div');
      infoDiv.style.marginBottom = '12px';
      infoDiv.style.paddingBottom = '12px';
      infoDiv.style.borderBottom = '1px dashed var(--border)';
      
      // バッジのスタイル判定
      let badgeClass = 'badge waiting';
      if (exam.status === '合格') badgeClass = 'badge success';
      if (exam.status === '不合格' || exam.status === '辞退') badgeClass = 'badge danger';
                         
      const dateFormatted = exam.date.replace('T', ' ');
      
      infoDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
          <span class="${badgeClass}">${exam.status || '結果待ち'}</span>
          <strong style="color: var(--primary); font-size: 1.05rem;">${exam.examName}</strong>
          <span style="color: var(--text); background: var(--bg); padding: 2px 6px; border-radius: 4px; font-size: 0.85rem;">${exam.stage}${exam.examContent ? '（' + exam.examContent + '）' : ''}</span>
        </div>
        </div>
        <div style="font-size: 0.85rem; color: var(--muted); padding-left: 2px;">
          <span style="margin-right: 12px;">📅 ${exam.date ? exam.date.replace('T', ' ') : '日程不明'}</span>
          ${exam.remarks ? `<span>📝 ${exam.remarks}</span>` : ''}
        </div>
      `;
      tdInfo.appendChild(infoDiv);
    });
    
    // 最後の要素は下線を消す
    if(tdInfo.lastChild) {
      tdInfo.lastChild.style.borderBottom = 'none';
      tdInfo.lastChild.style.marginBottom = '0';
      tdInfo.lastChild.style.paddingBottom = '0';
    }
    
    tr.appendChild(tdInfo);
    tbody.appendChild(tr);
  });
}

// ==========================================
// データ編集モーダル用ロジック
// ==========================================
const editModal = document.getElementById('edit-modal');
const openEditBtn = document.getElementById('open-edit-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const formStudent = document.getElementById('form-student');
const formExam = document.getElementById('form-exam');
const formStage = document.getElementById('form-stage');
const formContent = document.getElementById('form-content');
const formDate = document.getElementById('form-date');
const formStatus = document.getElementById('form-status');
const formRemarks = document.getElementById('form-remarks');
const addExamBtn = document.getElementById('add-exam-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const exportDataBtn = document.getElementById('export-data-btn');
const existingExamsList = document.getElementById('existing-exams-list');

let editingIndex = null;

openEditBtn.addEventListener('click', () => {
  editModal.style.display = 'flex';
  populateStudentDropdown();
  renderExistingExamsList();
});

closeModalBtn.addEventListener('click', () => {
  editModal.style.display = 'none';
  if (cancelEditBtn) cancelEditBtn.click();
  initApp(); // 画面をリロード
});

if (cancelEditBtn) {
  cancelEditBtn.addEventListener('click', () => {
    editingIndex = null;
    addExamBtn.textContent = 'この内容で予定を追加する';
    cancelEditBtn.style.display = 'none';
    
    // フォームクリア
    formExam.value = '';
    formStage.value = '';
    formContent.value = '';
    formDate.value = '';
    formRemarks.value = '';
  });
}

function populateStudentDropdown() {
  formStudent.innerHTML = '';
  appData.students.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.id} ${s.name}`;
    formStudent.appendChild(opt);
  });
}

function renderExistingExamsList() {
  existingExamsList.innerHTML = '';
  
  // Datalistの更新
  const examList = document.getElementById('exam-list');
  if (examList) {
    examList.innerHTML = '';
    const uniqueExams = [...new Set(appData.exams.map(e => e.examName))];
    uniqueExams.forEach(name => {
      if (name) {
        const opt = document.createElement('option');
        opt.value = name;
        examList.appendChild(opt);
      }
    });
  }
  
  // 日付の新しい順（降順）に表示、日付がないものは一番後ろ
  const sortedExams = [...appData.exams].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
  
  sortedExams.forEach((exam) => {
    const originalIndex = appData.exams.indexOf(exam);
    const s = appData.students.find(st => st.id === exam.studentId);
    
    const div = document.createElement('div');
    div.style.background = '#f1f5f9';
    div.style.padding = '8px 12px';
    div.style.borderRadius = '4px';
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.style.alignItems = 'center';
    const dateFormatted = exam.date ? exam.date.replace('T', ' ') : '日程不明';
    div.innerHTML = `
      <div>
        <strong>${s ? s.name : '不明'}</strong> | ${exam.examName} (${exam.stage}${exam.examContent ? ' / ' + exam.examContent : ''})<br>
        <span style="font-size:0.8rem; color:var(--muted);">${dateFormatted} | ${exam.status}</span>
      </div>
    `;
    
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '8px';
    
    const editBtn = document.createElement('button');
    editBtn.textContent = '編集';
    editBtn.style.background = 'var(--accent)';
    editBtn.style.color = 'white';
    editBtn.style.border = 'none';
    editBtn.style.padding = '4px 8px';
    editBtn.style.borderRadius = '4px';
    editBtn.style.cursor = 'pointer';
    editBtn.style.fontSize = '0.8rem';
    
    editBtn.addEventListener('click', () => {
      editingIndex = originalIndex;
      formStudent.value = exam.studentId || '';
      formExam.value = exam.examName || '';
      formStage.value = exam.stage || '';
      formContent.value = exam.examContent || '';
      formDate.value = exam.date || '';
      formStatus.value = exam.status || '結果待ち';
      formRemarks.value = exam.remarks || '';
      
      addExamBtn.textContent = '編集内容を保存する';
      if (cancelEditBtn) cancelEditBtn.style.display = 'block';
      
      // 編集のために上にスクロール
      document.querySelector('.modal-body') && document.querySelector('.modal-body').scrollTo(0, 0);
    });
    
    const delBtn = document.createElement('button');
    delBtn.textContent = '削除';
    delBtn.style.background = 'var(--danger)';
    delBtn.style.color = 'white';
    delBtn.style.border = 'none';
    delBtn.style.padding = '4px 8px';
    delBtn.style.borderRadius = '4px';
    delBtn.style.cursor = 'pointer';
    delBtn.style.fontSize = '0.8rem';
    
    delBtn.addEventListener('click', () => {
      if (confirm('この予定を削除しますか？')) {
        appData.exams.splice(originalIndex, 1);
        renderExistingExamsList();
      }
    });
    
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(delBtn);
    div.appendChild(btnContainer);
    existingExamsList.appendChild(div);
  });
}

addExamBtn.addEventListener('click', () => {
  const sId = formStudent.value;
  const examName = formExam.value.trim();
  const stage = formStage.value.trim();
  const examContentStr = formContent.value.trim();
  const date = formDate.value;
  const status = formStatus.value;
  const remarks = formRemarks.value.trim();
  
  if (!examName || !stage) {
    alert('試験名と選考段階は必須です。');
    return;
  }
  
  const newExam = {
    studentId: sId,
    examName: examName,
    stage: stage,
    examContent: examContentStr,
    date: date || '',
    status: status,
    remarks: remarks
  };
  
  if (editingIndex !== null) {
    appData.exams[editingIndex] = newExam;
    editingIndex = null;
    addExamBtn.textContent = 'この内容で予定を追加する';
    if (cancelEditBtn) cancelEditBtn.style.display = 'none';
  } else {
    appData.exams.push(newExam);
  }
  
  // フォームクリア
  formExam.value = '';
  formStage.value = '';
  formContent.value = '';
  formDate.value = '';
  formRemarks.value = '';
  
  renderExistingExamsList();
});

// data.js のファイル出力処理
exportDataBtn.addEventListener('click', () => {
  const content = `// 将来的にはこのファイルに「授業演習用のデータ」も追加できるように設計しています。

const appData = {
  // 学生マスター（学籍番号、氏名）
  // 演習システム側からもこのマスターを参照できるようにします
  students: ${JSON.stringify(appData.students, null, 4)},
  
  // 本番の試験・面接予定と結果
  exams: ${JSON.stringify(appData.exams, null, 4)}
};
`;
  
  const blob = new Blob([content], { type: 'application/javascript;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "data.js");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
