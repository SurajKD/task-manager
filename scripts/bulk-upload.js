const API_BASE = 'http://localhost:3001/api/tasks';
const TASKS = require('./bulk-tasks.json');

async function bulkUpload() {
  console.log(`Starting bulk upload of ${TASKS.length} tasks...\n`);

  let success = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < TASKS.length; i++) {
    const task = TASKS[i];
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: `task-bulk-${Date.now()}-${i}`,
          member: task.member,
          text: task.text,
          tags: task.tags || [],
        }),
      });

      const data = await res.json();

      if (data.success) {
        success++;
        console.log(`[${i + 1}/${TASKS.length}] ✅ ${task.member}: ${task.text.substring(0, 60)}...`);
      } else {
        failed++;
        errors.push({ index: i, task, error: data.error });
        console.log(`[${i + 1}/${TASKS.length}] ❌ ${task.member}: ${task.text.substring(0, 60)}... (${data.error})`);
      }
    } catch (err) {
      failed++;
      errors.push({ index: i, task, error: err.message });
      console.log(`[${i + 1}/${TASKS.length}] ❌ ${task.member}: ${task.text.substring(0, 60)}... (${err.message})`);
    }

    // Small delay to avoid overwhelming the server
    await new Promise(r => setTimeout(r, 50));
  }

  console.log(`\n========== BULK UPLOAD COMPLETE ==========`);
  console.log(`Total: ${TASKS.length} | ✅ Success: ${success} | ❌ Failed: ${failed}`);

  // Summary by member
  const byMember = {};
  TASKS.forEach(t => {
    byMember[t.member] = (byMember[t.member] || 0) + 1;
  });
  console.log('\nDistribution:');
  Object.entries(byMember).forEach(([member, count]) => {
    console.log(`  ${member}: ${count} tasks`);
  });

  if (errors.length > 0) {
    console.log(`\nErrors (${errors.length}):`);
    errors.forEach(e => console.log(`  [${e.index}] ${e.task.member}: ${e.error}`));
  }
}

bulkUpload().catch(console.error);
