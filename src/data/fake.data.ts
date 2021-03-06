import { Schedule } from '../service/calendar.service';
// new class implements Schedule {
//   content: string;
//   endDate: Date;
//   id: string;
//   isAllDay: boolean;
//   name: string;
//   startDate: Date;
// }
export const fakeData: Schedule[] = [
  {
    id: '1',
    name: '첫번째 스케쥴',
    content: '이것은 첫번째 스케쥴이다.',
    startDate: new Date('2021-06-01'),
    endDate: new Date('2021-06-03'),
    isAllDay: true
  },
  {
    id: '2',
    name: '두번째 스케쥴',
    content: '이것은 두번째 스케쥴이다.',
    startDate: new Date('2021-05-31'),
    endDate: new Date('2021-06-11'),
    isAllDay: true
  },
  {
    id: '3',
    name: '세번째 스케쥴',
    content: '이것은 세번째 스케쥴이다.',
    startDate: new Date('2021-06-18'),
    endDate: new Date('2021-06-29'),
    isAllDay: true
  },
  {
    id: '4',
    name: '네번째 스케쥴',
    content: '이것은 네번째 스케쥴이다.',
    startDate: new Date('2021-06-20'),
    endDate: new Date('2021-06-22'),
    isAllDay: true
  },
  {
    id: '5',
    name: '다섯번째 스케쥴',
    content: '이것은 다섯번째 스케쥴이다.',
    startDate: new Date('2021-06-03'),
    endDate: new Date('2021-06-19'),
    isAllDay: true
  },
  {
    id: '6',
    name: '여셧번째 스케쥴',
    content: '이것은 다섯번째 스케쥴이다.',
    startDate: new Date('2021-06-19'),
    endDate: new Date('2021-06-20'),
    isAllDay: true
  },
  {
    id: '7',
    name: '일곱번째 스케쥴',
    content: '이것은 일곱번째 스케쥴이다.',
    startDate: new Date('2021-07-02'),
    endDate: new Date('2021-07-10'),
    isAllDay: true
  }
];
