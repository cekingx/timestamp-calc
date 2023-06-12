const dayjs = require('dayjs');
const times = require('./time.json');

const objects = {};

for(let i = 0; i < times.length; i++) {
  let item = times[i];
  if(item.start) {
    item.start = dayjs(item.start)
  }
  objects[item.id] = item;
}

for(let i = 0; i < times.length; i++) {
  let item = times[i];
  if(item.start) {
    item['end'] = item['start'].add(item.duration.value, item.duration.unit);
    objects[item.id] = item;
  } else {
    let before = objects[item.after_id];
    item['start'] = before['end'];
    item['end'] = item['start'].add(item.duration.value, item.duration.unit);
    objects[item.id] = item;
  }
}

for(let i = 0; i < times.length; i++) {
  let id = times[i].id;
  let item = objects[id];
  console.log(item['name'] + ' - ' + item['description']);
  console.log(item['start'].format('dddd, YYYY-MM-DD HH:mm:ss'), item['start'].unix());
  console.log(item['end'].format('dddd, YYYY-MM-DD HH:mm:ss'), item['end'].unix());
  console.log();
}