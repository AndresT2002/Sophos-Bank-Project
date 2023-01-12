export interface Product {
    id: number,
    productType: string,
    productNumber: number,
    status: string,
    productBalance: number,
    productAvailable: number,
    debtValue: number,
    gmf: string,
    createdAt: string,
    createdBy: string,
    modifiedAt: string,
    modifiedBy: string
  }
  
  
  export interface ProductDeposit{
    productNumber:string,
    value:string,
    modifiedBy:string
  }
  
  export interface CurrentUser{
    name: string,
    id: number,
    enabled: boolean,
    role: string,
    identificationNumber: number,
    password: string,
    username: string,
    authorities: Array<null>,
    accountNonLocked: boolean,
    credentialsNonExpired: boolean,
    accountNonExpired: boolean
  }

  export interface TransactionHistory{
    id: number,
    clientId: number,
    productNumber: number,
    transactionType: string,
    productBalance: number,
    productAvailable: number,
    movementType: string,
    transactionDate: string,
    amount: number
  }

  export interface Client{
    id:string,
    name:string,
    lastName:string,
    email:string,
    birthDay:string,
    createdAt:string,
    createdBy:string,
    modifiedBy:string,
    modifiedAt:string,
    identificationType:string,
    identificationNumber:number,
    role:string ,
    password: string,
    products: []
  }

  export interface UpdateClient{
    id: string,
    name: string,
    lastName: string,
    identificationType: string,
    identificationNumber: number,
    email: string,
    password: string,
    modifiedBy: string
  }