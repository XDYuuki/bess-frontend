export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ILoginResponse {
	token: string;
	refreshToken: string;
	expires: string;
	roles: string;
}

export interface IRegisterRequest {
	//companyName: string;
    //companyDocument?: string;
    userName: string;
    userEmail: string;
    //userDocument: string;
    //userPhone: string;
    userPassword: string;
}

export interface IConfirmEmailRequest {
	email: string;
	code: string;
}


export interface  GoogleLoginRequest {
	credential?: string;
}

export interface IForgotPasswordRequest {
	email: string;
}

export interface IResetPasswordRequest {
	email: string;
	code: string;
	password: string;
}

export interface IMyselfInfo {
    id: string;
    fullName: string;
    document: string;
    email: string;
    phoneNumber: string;
    companyRoleId: string;
    companyRoleName: string;
    departmentId: string;
    departmentName: string;
    createdAt: string;
    updatedAt: string;
    emailConfirmed: boolean;
    metadata?: {
        firstPromoter:{
            promoterId: string;
            campaignId: string;
            email: string;            
        }
    };       
}