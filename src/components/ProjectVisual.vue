<script setup>
import layers from '../assets/reservoir-layers.svg'
defineProps({ type: String })
const taskStats = [
  { label: 'Tổng công việc', value: '12', note: 'Trong workspace', tone: 'blue' },
  { label: 'Đang thực hiện', value: '04', note: 'Từng bước tiến lên', tone: 'violet' },
  { label: 'Đã hoàn thành', value: '05', note: 'Những việc đã xong', tone: 'green' },
  { label: 'Đang quá hạn', value: '03', note: 'Cần bạn chú ý', tone: 'orange' }
]
const attentionTasks = [
  { name: 'deploy app', id: 'TF-004 · ISS', date: '02/10/2026' },
  { name: 'Vẽ cục UI Reservoir', id: 'TF-011 · ISS', date: '08/10/2026' },
  { name: 'Update version APP', id: 'TF-005 · ISS', date: '09/10/2026' }
]
</script>
<template>
  <div v-if="type === 'workspace'" class="project-art workspace-art" role="img" aria-label="Concept illustration of a document and data workspace">
    <div class="window-bar"><span>● ● ●</span><span>SUBSURFACE / WORKSPACE</span></div>
    <div class="app-preview"><div class="explorer"><b>EXPLORER</b><span>⌄ Projects</span><span>Data library</span><span>Documents</span><span>Well logs</span><span>3D models</span></div>
      <div class="app-canvas"><strong>Everything in its place.</strong><p>Explore data. Open documents. Stay in flow.</p><div class="mini-tabs"><span>Overview</span><span>Documents</span><span>Model</span></div><div class="mini-panels"><div v-for="name in ['Data library', 'Document viewer']" :key="name"><b>{{ name }}</b><small>{{ name === 'Data library' ? 'Organized by context' : 'One connected workspace' }}</small><i/><i/><i/></div></div></div>
    </div>
  </div>
  <div v-else-if="type === 'reservoir'" class="project-art reservoir-art"><span class="art-label">02 / DATA VISUALIZATION</span><div class="layers-slot"><img :src="layers" width="400" height="255" alt="Conceptual geological layers" /></div><strong>Layers of insight.</strong></div>
  <div v-else class="project-art taskflow-art" role="img" aria-label="TaskFlow desktop overview with sidebar, task counts, overdue tasks and workspace progress">
    <aside class="taskflow-sidebar">
      <strong><span>✓</span> taskflow.</strong>
      <div class="taskflow-space"><b>P</b><span>Personal workspace<small>Không gian của bạn</small></span></div>
      <small class="taskflow-nav-label">WORKSPACE</small>
      <span class="taskflow-nav-item selected">▦ <b>Tổng quan</b></span>
      <span class="taskflow-nav-item">☼ <b>My Day</b></span>
      <span class="taskflow-nav-item">▤ <b>Tất cả công việc</b></span>
      <span class="taskflow-nav-item">▦ <b>Lịch công việc</b></span>
      <span class="taskflow-nav-item">◷ <b>Lịch sử hoạt động</b></span>
      <small class="taskflow-nav-label">DỰ ÁN</small>
      <span class="taskflow-nav-item"><i/> Cá nhân</span>
      <span class="taskflow-sidebar-foot">Lưu trên Firebase</span>
    </aside>
    <div class="taskflow-dashboard">
      <header class="taskflow-topbar"><span>Workspace　/　Tổng quan</span><span>Th 2, 12 tháng 10, 2026</span></header>
      <div class="taskflow-content">
        <div class="taskflow-heading"><div><small>YOUR WORK, IN FOCUS</small><h3>Tổng quan</h3><p>Một góc nhìn rõ ràng cho ngày làm việc của bạn.</p></div><span>＋ Tạo task</span></div>
        <div class="taskflow-stat-grid">
          <div v-for="stat in taskStats" :key="stat.label" class="taskflow-stat" :class="stat.tone"><small>{{ stat.label }}</small><strong>{{ stat.value }}</strong><span>{{ stat.note }}</span></div>
        </div>
        <div class="taskflow-panels">
          <section class="taskflow-attention"><header><strong>Cần chú ý</strong><small>3 công việc</small></header><div v-for="task in attentionTasks" :key="task.id" class="taskflow-task"><span class="taskflow-clock">◷</span><span><b>{{ task.name }}</b><small>{{ task.id }}</small></span><time>{{ task.date }}</time></div></section>
          <section class="taskflow-progress"><strong>Tiến độ workspace</strong><b>42<span>%</span></b><i><span/></i><small>5 / 12 công việc đã hoàn thành</small><span class="taskflow-open-day">☼　Mở My Day</span></section>
        </div>
        <footer class="taskflow-activity"><strong>Hoạt động gần đây</strong><span>Cập nhật công việc　·　TF-011 · Vẽ cục UI Reservoir</span></footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.taskflow-art {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  min-height: 330px;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e7eaf2;
  border-radius: 7px;
  background: #f5f7fb;
  color: #27334a;
  font-family: Arial, sans-serif;
  font-size: 10px;
  line-height: 1.4;
}

.taskflow-sidebar {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 14px 10px;
  border-right: 1px solid #e7eaf2;
  background: #fff;
}

.taskflow-sidebar > strong {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 8px;
  font-size: 16px;
}

.taskflow-sidebar > strong span {
  display: grid;
  width: 25px;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 7px;
  background: #5366eb;
  color: #fff;
}

.taskflow-space,
.taskflow-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 25px;
  padding: 5px;
  border-radius: 5px;
}

.taskflow-space {
  margin-bottom: 5px;
  border: 1px solid #e7eaf2;
}

.taskflow-space > b {
  display: grid;
  width: 22px;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 5px;
  background: #f0f2ff;
  color: #5366eb;
}

.taskflow-space small,
.taskflow-nav-label,
.taskflow-stat > span,
.taskflow-task small {
  display: block;
  color: #8a95ac;
}

.taskflow-nav-label {
  margin: 6px 0 0 3px;
  font-size: 8px;
  font-weight: 700;
}

.taskflow-nav-item {
  color: #77839a;
}

.taskflow-nav-item.selected {
  background: #eef0ff;
  color: #5264e6;
}

.taskflow-nav-item b {
  font-weight: 500;
}

.taskflow-nav-item i {
  width: 5px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #6e79ef;
}

.taskflow-sidebar-foot {
  margin-top: auto;
  padding: 8px 5px;
  border-radius: 5px;
  background: #f5f7fb;
  color: #78859b;
}

.taskflow-dashboard {
  min-width: 0;
}

.taskflow-topbar {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 14px;
  border-bottom: 1px solid #e7eaf2;
  background: #fff;
  color: #8a95ac;
  font-size: 8px;
}

.taskflow-content {
  display: grid;
  gap: 12px;
  padding: 14px;
}

.taskflow-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.taskflow-heading small {
  color: #8a95ac;
  font-size: 7px;
  letter-spacing: 1px;
}

.taskflow-heading h3 {
  margin: 3px 0;
  font-size: 19px;
  letter-spacing: 0;
}

.taskflow-heading p {
  color: #8a95ac;
  font-size: 8px;
}

.taskflow-heading > span {
  flex: none;
  padding: 7px 9px;
  border-radius: 5px;
  background: #5366eb;
  color: #fff;
}

.taskflow-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 7px;
}

.taskflow-stat,
.taskflow-attention,
.taskflow-progress,
.taskflow-activity {
  min-width: 0;
  padding: 10px;
  border: 1px solid #e7eaf2;
  border-radius: 6px;
  background: #fff;
}

.taskflow-stat > small,
.taskflow-progress > small {
  display: block;
  color: #8792a9;
  font-size: 8px;
}

.taskflow-stat > strong {
  display: block;
  margin: 3px 0;
  font-size: 20px;
}

.taskflow-stat > span {
  font-size: 7px;
}

.taskflow-panels {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(120px, 1fr);
  gap: 8px;
}

.taskflow-attention header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  font-size: 9px;
}

.taskflow-attention header small {
  color: #8a95ac;
  font-size: 7px;
}

.taskflow-task {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) auto;
  align-items: center;
  gap: 6px;
  min-width: 0;
  padding: 7px 0;
  border-top: 1px solid #edf0f5;
}

.taskflow-clock {
  display: grid;
  width: 18px;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 4px;
  background: #f5f7fb;
  color: #e2747a;
}

.taskflow-task b {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 8px;
}

.taskflow-task small,
.taskflow-task time {
  font-size: 7px;
}

.taskflow-task time {
  color: #d6787f;
}

.taskflow-progress {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.taskflow-progress > strong {
  font-size: 9px;
}

.taskflow-progress > b {
  color: #5264b7;
  font-size: 34px;
}

.taskflow-progress > b span {
  font-size: 14px;
}

.taskflow-progress > i {
  width: 100%;
  height: 5px;
  overflow: hidden;
  border-radius: 5px;
  background: #e8ebf5;
}

.taskflow-progress > i span {
  display: block;
  width: 42%;
  height: 100%;
  border-radius: inherit;
  background: #7483e9;
}

.taskflow-progress > small {
  font-size: 7px;
}

.taskflow-open-day {
  padding: 5px 7px;
  border: 1px solid #e7eaf2;
  border-radius: 4px;
  color: #75819a;
  font-size: 7px;
}

.taskflow-activity {
  display: grid;
  gap: 6px;
  font-size: 8px;
}

.taskflow-activity > span {
  color: #7d89a1;
}

.taskflow-stat.blue strong { color: #27334a; }
.taskflow-stat.violet strong { color: #7b6be3; }
.taskflow-stat.green strong { color: #55a98b; }
.taskflow-stat.orange strong { color: #d3994a; }

@media (max-width: 600px) {
  .taskflow-art {
    grid-template-columns: 90px minmax(0, 1fr);
    min-height: 260px;
    font-size: 8px;
  }

  .taskflow-sidebar {
    gap: 4px;
    padding: 8px 5px;
  }

  .taskflow-sidebar > strong {
    font-size: 11px;
  }

  .taskflow-space {
    font-size: 7px;
  }

  .taskflow-content {
    gap: 7px;
    padding: 8px;
  }

  .taskflow-stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .taskflow-panels {
    grid-template-columns: 1fr;
  }

  .taskflow-progress {
    display: none;
  }

  .taskflow-activity {
    display: none;
  }
}
</style>
