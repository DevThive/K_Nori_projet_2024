import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassService } from 'src/class/class.service';
import { Reservation } from 'src/entity/reservation.entity';
import { ReservationService } from 'src/reservation/reservation.service';
import { UsersService } from 'src/users/users.service';
import { Between, Equal, In, Repository } from 'typeorm';
import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

@Injectable()
export class DashboardService {
  constructor(
    private readonly userService: UsersService,
    private readonly classService: ClassService,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  //연도별 예약조회
  async findreservationbyyear(userId: number, year: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }
    const formattedYear = year.toString(); // 연도를 문자열로 변환
    const startDate = new Date(`${formattedYear}-01-01`); // 해당 연도의 시작일
    const endDate = new Date(`${formattedYear}-12-31`); // 해당 연도의 종료일

    const result = await this.reservationRepository.count({
      where: {
        date: Between(startDate, endDate), // startDate부터 endDate까지의 범위에 해당하는 데이터만 검색
      },
    });

    return result;
  }

  //연도별 예약 완료 건수 조회
  async findcompletedreservation(userId: number, year: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }
    const formattedYear = year.toString(); // 연도를 문자열로 변환
    const startDate = new Date(`${formattedYear}-01-01`); // 해당 연도의 시작일
    const endDate = new Date(`${formattedYear}-12-31`); // 해당 연도의 종료일

    const result = await this.reservationRepository.count({
      where: {
        state: 2,
        date: Between(startDate, endDate),
      },
    });

    return result;
  }

  //한달예상매출액(한달매출조회)
  async findmonthlycost(userId: number, year: number, month: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    // 연도와 월을 문자열로 변환
    const formattedYear = year.toString();
    const formattedMonth = month.toString().padStart(2, '0'); // 월이 한 자리 수인 경우 앞에 0을 추가하여 두 자리로 만듦

    // 시작일과 종료일 생성
    const startDate = new Date(`${formattedYear}-${formattedMonth}-01`);
    const endDate = new Date(
      new Date(startDate).setMonth(startDate.getMonth() + 1),
    ); // 다음 달의 시작일

    // 해당 월의 예약 완료 건수 조회
    const reservations = await this.reservationRepository.find({
      where: {
        state: 2,
        date: Between(startDate, endDate),
      },
      select: ['totalPeople'],
    });

    // 예약된 총 인원 계산
    const totalPeople = reservations.reduce(
      (acc, cur) => acc + cur.totalPeople,
      0,
    );

    // 총 매출액 계산
    const totalRevenue = totalPeople * 18000;

    return totalRevenue;
  }

  //이번해매출수익액
  async findyearlycost(userId: number, year: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }
    const formattedYear = year.toString(); // 연도를 문자열로 변환
    const startDate = new Date(`${formattedYear}-01-01`); // 해당 연도의 시작일
    const endDate = new Date(`${formattedYear}-12-31`); // 해당 연도의 종료일

    const result = await this.reservationRepository.find({
      where: {
        state: 2,
        date: Between(startDate, endDate),
      },
    });

    let totalPeople = 0;
    result.forEach((reservation) => {
      totalPeople += reservation.totalPeople;
    });

    const totalRevenue = totalPeople * 18000;

    return totalRevenue;
  }

  // 특정 날짜 예약 건수 조회(일일 예약건수 조회)
  async findCompletedReservationByDate(userId: number, date: string) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const selectedDate = new Date(date);
    const startDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      0,
      0,
      0,
    );
    const endDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      23,
      59,
      59,
    );

    const reservationCount = await this.reservationRepository.count({
      where: {
        state: 2,
        date: Between(startDate, endDate),
      },
    });

    return { date, reservationCount };
  }

  async findCompletedReservationByWeek(userId: number, weekNumber: number) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    // 현재 년도를 기준으로 주차에 해당하는 주의 시작일과 종료일을 계산합니다.
    const year = new Date().getFullYear();
    const firstDayOfYear = new Date(year, 0, 1);
    const weeksPassedBefore = weekNumber - 1;
    const startDate = startOfWeek(
      new Date(
        firstDayOfYear.getTime() + weeksPassedBefore * 7 * 24 * 60 * 60 * 1000,
      ),
      { weekStartsOn: 1 },
    );
    const endDate = endOfWeek(startDate, { weekStartsOn: 1 });

    const datesOfTheWeek = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    const weeklyBookings = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 자정으로 설정

    let todayBookings = 0;
    const todayStart = new Date(today.getTime());
    const todayEnd = new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1); // 다음 날짜의 자정 직전
    todayBookings = await this.reservationRepository.count({
      where: {
        state: 2,
        date: Between(todayStart, todayEnd),
      },
    });

    for (const date of datesOfTheWeek) {
      const reservationCount = await this.reservationRepository.count({
        where: {
          state: 2,
          date: Between(
            date, // 해당 날짜의 자정
            new Date(date.getTime() + 24 * 60 * 60 * 1000 - 1), // 다음 날짜의 자정 직전
          ),
        },
      });
      weeklyBookings.push(reservationCount);
    }

    return { weeklyBookings, todayBookings };
  }

  //클래스별 예약건수(누적)
  async findReservationCountsByClass(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const classes = await this.classService.findallclasses(userId); // 클래스 정보를 가져옴.
    const classReservationCounts = [];

    for (const classInfo of classes) {
      const classId = classInfo.id;
      const reservationCount = await this.reservationRepository.count({
        where: {
          state: 2,
          class: Equal(classId), // 클래스 아이디로 필터링
        },
      });

      // 진행률 계산
      const progress =
        reservationCount > 0 ? Math.min(reservationCount / 100, 1) * 100 : 0;

      // 진행률에 따른 색상 설정
      let progressColor = '';
      if (progress < 10) {
        progressColor = 'error';
      } else if (progress < 30) {
        progressColor = 'warning';
      } else if (progress < 50) {
        progressColor = 'primary';
      } else if (progress < 70) {
        progressColor = 'info';
      } else {
        progressColor = 'success';
      }

      classReservationCounts.push({
        progress: progress,
        title: classInfo.title,
        progressColor: progressColor,
        imgSrc: classInfo.photo,
      });
    }

    return classReservationCounts;
  }

  //클래스별 예약건수(연도별)
  async findCountClassesByYear(userId: number, year: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const formattedYear = year.toString(); // 연도를 문자열로 변환
    const startDate = new Date(`${formattedYear}-01-01`); // 해당 연도의 시작일
    const endDate = new Date(`${formattedYear}-12-31`); // 해당 연도의 종료일

    const classes = await this.classService.findallclasses(userId); // 클래스 정보를 가져옴
    const classReservationCounts = [];

    for (const classInfo of classes) {
      const classId = classInfo.id;
      const reservationCount = await this.reservationRepository.count({
        where: {
          state: 2,
          class: Equal(classId), // 클래스 아이디로 필터링
          date: Between(startDate, endDate),
        },
      });

      // 진행률 계산
      const progress =
        reservationCount > 0 ? Math.min(reservationCount / 100, 1) * 100 : 0;

      // 진행률에 따른 색상 설정
      let progressColor = '';
      if (progress < 10) {
        progressColor = 'error';
      } else if (progress < 30) {
        progressColor = 'warning';
      } else if (progress < 50) {
        progressColor = 'primary';
      } else if (progress < 70) {
        progressColor = 'info';
      } else {
        progressColor = 'success';
      }

      classReservationCounts.push({
        progress: progress,
        title: classInfo.title,
        progressColor: progressColor,
        imgSrc: classInfo.photo,
      });
    }

    return { classReservationCounts };
  }

  //예약 미승인건수 조회
  async unapprovedReservationCount(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const result = await this.reservationRepository.count({
      where: {
        state: 0,
      },
    });

    return result;
  }

  //한달 예약건수
  async findmonthlyreservation(userId: number, year: number, month: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    // 연도와 월을 문자열로 변환
    const formattedYear = year.toString();
    const formattedMonth = month.toString().padStart(2, '0'); // 월이 한 자리 수인 경우 앞에 0을 추가하여 두 자리로 만듦

    // 시작일과 종료일 생성
    const startDate = new Date(`${formattedYear}-${formattedMonth}-01`);
    const endDate = new Date(
      new Date(startDate).setMonth(startDate.getMonth() + 1),
    ); // 다음 달의 시작일

    // 해당 월의 예약 완료 건수 조회
    const reservations = await this.reservationRepository.count({
      where: {
        state: 2,
        date: Between(startDate, endDate),
      },
    });

    return reservations;
  }

  //6개월 예약 건수 월별 조회

  async findhalfmonthreservation(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const currentDate = new Date();
    const sixMonthsAgo = new Date(currentDate);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

    const monthlyReservationCounts = [];

    for (let i = 0; i < 6; i++) {
      const year = sixMonthsAgo.getFullYear();
      const month = sixMonthsAgo.getMonth() + 1;
      const startDate = new Date(year, month - 1, 1); // 각 월의 시작일
      const endDate = new Date(year, month, 0); // 각 월의 마지막 날

      // 해당 월의 예약 완료 및 취소 건수 조회
      const reservations = await this.reservationRepository.count({
        where: {
          state: In([0, 1]), // 예약 완료 및 취소 상태
          date: Between(startDate, endDate),
        },
      });

      monthlyReservationCounts.push({
        year: year,
        month: month,
        reservationCount: reservations,
      });

      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() + 1); // 다음 달로 이동
    }

    return monthlyReservationCounts;
  }

  //6개월 방문 건수 월별 조회

  async findhalfmonthvisiting(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const currentDate = new Date();
    const sixMonthsAgo = new Date(currentDate);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

    const monthlyReservationCounts = [];

    for (let i = 0; i < 6; i++) {
      const year = sixMonthsAgo.getFullYear();
      const month = sixMonthsAgo.getMonth() + 1;
      const startDate = new Date(year, month - 1, 1); // 각 월의 시작일
      const endDate = new Date(year, month, 0); // 각 월의 마지막 날

      // 해당 월의 예약 완료 및 취소 건수 조회
      const reservations = await this.reservationRepository.count({
        where: {
          state: In([2]), // 예약 완료 및 취소 상태
          date: Between(startDate, endDate),
        },
      });

      monthlyReservationCounts.push({
        year: year,
        month: month,
        reservationCount: reservations,
      });

      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() + 1); // 다음 달로 이동
    }

    return monthlyReservationCounts;
  }
}

// //일주일 매출수익액
// async findWeeklyRevenue(userId: number, year: number, weekNumber: number) {
//   const user = await this.userService.findUserById(userId);

//   if (user.role !== 1) {
//     throw new BadRequestException('관리자만 조회가 가능합니다.');
//   }

//   const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
//   const endDate = new Date(year, 0, 1 + weekNumber * 7);
//   const reservations = await this.reservationRepository.find({
//     where: {
//       date: Between(startDate, endDate),
//       state: 2, // 예약 완료 상태일 경우에만 계산
//     },
//   });

//   let totalRevenue = 0;
//   reservations.forEach((reservation) => {
//     totalRevenue += reservation.totalPeople * 18000;
//   });

//   return totalRevenue;
// }
