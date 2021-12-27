import { ITimeOffBalanceDTO, TimeOffMap } from "infra/domain/timeoff-balance/model";
import { NotFoundError } from "infra/helper/error";
import { timeOffBalanceRepo } from "infra/repository";

export class TimeOffBalanceService{
    async createNewTimeOffBalance(payload: {
        employee_id: string,
        year: string,
        balance: number
    }): Promise<ITimeOffBalanceDTO>{
        const employeeId: number = parseInt(payload.employee_id)
        const {year, balance} = payload
        const result = await timeOffBalanceRepo.save({employee_id: employeeId, year, balance})

        return TimeOffMap.toDTO(result)
    }

    async getTimeOffBalance(
        employee_id: string,
    ): Promise<ITimeOffBalanceDTO[]>{
        const employeeId: number = parseInt(employee_id)
        const result = await timeOffBalanceRepo.findAllByIdEmployee(employeeId)

        return result.map((data) => TimeOffMap.toDTO(data))
    }

    async updateTimeOffBalance(payload:{
        employee_id: string,
        year: string,
        balance: number
    }): Promise<null>{
        const employeeId: number = parseInt(payload.employee_id)

        const timeOffBalance = await timeOffBalanceRepo.findByPk(employeeId)

        if (!timeOffBalance) throw new NotFoundError("TimeOffBalance Not Found")

        const {year, balance} = payload
        await timeOffBalanceRepo.update({employee_id: employeeId, year, balance})

        return null
    }

    //todo update
}