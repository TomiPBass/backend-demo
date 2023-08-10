import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { AccountExternalService } from './account-external.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

import {
	ACCOUNTS_ALIAS,
	ACCOUNT_CODE_API_PARAM,
} from '@backend-demo/shared/constants';
import {
	ApiAcceptedResponse,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { accountManagementRoutes } from '../account-management.routes';
import { ViewAccountDto } from './dto/view-account.dto';
import { plainToClass } from 'class-transformer';

@ApiTags(ACCOUNTS_ALIAS)
@Controller(accountManagementRoutes.account)
export class AccountController {
	constructor(
		private readonly accountExternalService: AccountExternalService
	) {}

	@Get(`:${ACCOUNT_CODE_API_PARAM}`)
	@ApiOperation({ summary: 'Find single account' })
	@ApiOkResponse()
	async findOne(@Param(ACCOUNT_CODE_API_PARAM) accountCode: string) {
		const entity = this.accountExternalService.findOne({
			code: accountCode,
		});
		return plainToClass(ViewAccountDto, entity, {
			excludeExtraneousValues: true,
		});
	}

	@Get()
	@ApiOperation({ summary: 'Find accounts' })
	@ApiOkResponse({ type: [ViewAccountDto] })
	async findAll() {
		const { rows, count } =
			await this.accountExternalService.findAndCountAll();

		const transformedRows = rows.map((entity) =>
			plainToClass(ViewAccountDto, entity, {
				excludeExtraneousValues: true,
			})
		);

		return { rows: transformedRows, count };
	}

	@Delete(`:${ACCOUNT_CODE_API_PARAM}`)
	@HttpCode(204)
	@ApiOperation({ summary: 'Delete account' })
	@ApiAcceptedResponse()
	async delete(@Param(ACCOUNT_CODE_API_PARAM) accountCode: string) {
		await this.accountExternalService.delete({ code: accountCode });
		return {};
	}

	@Post()
	@ApiOperation({ summary: 'Create account' })
	@ApiCreatedResponse()
	async create(@Body() createAccountDto: CreateAccountDto) {
		const entity = await this.accountExternalService.create(
			createAccountDto
		);
		return plainToClass(ViewAccountDto, entity, {
			excludeExtraneousValues: true,
		});
	}

	@Patch(`:${ACCOUNT_CODE_API_PARAM}`)
	@ApiOperation({ summary: 'Update account' })
	@ApiOkResponse()
	async update(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Body() updateAccountDto: UpdateAccountDto
	) {
		const entity = await this.accountExternalService.update(
			{ code: accountCode },
			updateAccountDto
		);
		return plainToClass(ViewAccountDto, entity, {
			excludeExtraneousValues: true,
		});
	}
}
