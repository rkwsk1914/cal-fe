import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Bank = {
  __typename?: 'Bank';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 支店名 */
  branchName?: Maybe<Scalars['String']['output']>;
  /** 設定カラー */
  color?: Maybe<Scalars['String']['output']>;
  /** 出金リスト */
  expenditures: Array<Expenditure>;
  /** 入金リスト */
  incomes: Array<Income>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 支払い方法 */
  payments: Array<Payment>;
};

export type BankBalance = {
  __typename?: 'BankBalance';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 銀行リレーション */
  bank: Bank;
  /** 出金データ */
  expenditureData: ExpenditureData;
  /** 入金データ */
  incomeData: IncomeData;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
};

export type CreateBankBalanceInput = {
  /** 銀行リレーション */
  bank: Scalars['String']['input'];
  /** 出金データ */
  expenditureData: ExpenditureDataInput;
  /** 入金データ */
  incomeData: IncomeDataInput;
};

export type CreateBankInput = {
  /** 支店名 */
  branchName: Scalars['String']['input'];
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
};

export type CreateExpenditureInput = {
  /** 金額 */
  amount: Scalars['Int']['input'];
  /** 説明・備考 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 固定費リレーション */
  fixedCost?: InputMaybe<Scalars['String']['input']>;
  /** ローンリレーション */
  loan?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 発生日 */
  payDay: Scalars['DateTime']['input'];
  /** 支払い方法 */
  payment: Scalars['String']['input'];
  /** SOPリレーション */
  sop?: InputMaybe<Scalars['String']['input']>;
  /** 月謝リレーション */
  subscriber?: InputMaybe<Scalars['String']['input']>;
  /** 税金リレーショナル */
  tax?: InputMaybe<Scalars['String']['input']>;
  /** 仮・未確定フラグ */
  temporary?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateFixedCostInput = {
  /** 金額 */
  amount: Scalars['Int']['input'];
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 固定費パターン */
  pattern: Scalars['String']['input'];
  /** 支払い方法 */
  payDay: Scalars['Int']['input'];
  /** 発生日 */
  payment: Scalars['String']['input'];
};

export type CreateFixedCostPatternInput = {
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
};

export type CreateIncomeInput = {
  /** 金額 */
  amount: Scalars['Int']['input'];
  /** 入金口座 */
  bank: Scalars['String']['input'];
  /** 発生日 */
  depositDate: Scalars['DateTime']['input'];
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 仮・未確定フラグ */
  temporary?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateLoanInput = {
  /** 支払い総額 */
  amount: Scalars['Int']['input'];
  /** 使用金額 */
  basePrice: Scalars['Int']['input'];
  /** 手数料 */
  commission: Scalars['Int']['input'];
  /** 分割回数 */
  installmentsCount: Scalars['Int']['input'];
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 支払日 */
  payDay: Scalars['Int']['input'];
  /** 支払い方法 */
  payment: Scalars['String']['input'];
  /** 利率 */
  rate: Scalars['Float']['input'];
  /** 開始日 */
  startDate: Scalars['DateTime']['input'];
};

export type CreateMonthlyDataInput = {
  /** バッファ率 */
  bufferRate: Scalars['Float']['input'];
  /** 固定費パターン */
  fixedCostPattern: Scalars['String']['input'];
  /** 月 */
  month: Scalars['Int']['input'];
  /** 貯蓄口座 */
  savingBank: Scalars['String']['input'];
  /** 貯蓄率 */
  savingRate: Scalars['Float']['input'];
  /** 年 */
  year: Scalars['Int']['input'];
};

export type CreatePaymentInput = {
  /** 引き落とし口座 */
  bank: Scalars['String']['input'];
  /** 締め日 */
  closingDay: Scalars['Int']['input'];
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** 支払日 */
  isCredit: Scalars['Int']['input'];
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 引き落とし日 */
  payDay: Scalars['Int']['input'];
  /** 編集不可フラグ */
  uneditable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateSopInput = {
  /** 基本支払い額 */
  basePrice: Scalars['Int']['input'];
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 支払日 */
  payDay: Scalars['Int']['input'];
  /** 支払い方法 */
  payment: Scalars['String']['input'];
  /** 月額支払額 */
  prices: Array<Scalars['Int']['input']>;
};

export type CreateSubscriberInput = {
  /** 基本支払い額 */
  basePrice: Scalars['Int']['input'];
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 支払日 */
  payDay: Scalars['Int']['input'];
  /** 支払い方法 */
  payment: Scalars['String']['input'];
  /** 月額支払額 */
  prices: Array<Scalars['Int']['input']>;
};

export type CreateTaxInput = {
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 支払い方法 */
  payment: Scalars['String']['input'];
};

export type Expenditure = {
  __typename?: 'Expenditure';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 金額 */
  amount: Scalars['Int']['output'];
  /** 説明・備考 */
  description?: Maybe<Scalars['String']['output']>;
  /** 重複回避ID */
  duplexingAvoidanceID?: Maybe<Scalars['String']['output']>;
  /** 固定費リレーション */
  fixedCost?: Maybe<FixedCost>;
  /** ローンリレーション */
  loan?: Maybe<Loan>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 発生日 */
  payDay: Scalars['DateTime']['output'];
  /** 支払い方法 */
  payment: Payment;
  /** SOPリレーション */
  sop?: Maybe<Sop>;
  /** 月謝リレーション */
  subscriber?: Maybe<Subscriber>;
  /** 税金リレーショナル */
  tax?: Maybe<Tax>;
  /** 仮・未確定フラグ */
  temporary?: Maybe<Scalars['Boolean']['output']>;
};

export type ExpenditureData = {
  __typename?: 'ExpenditureData';
  /** 先月までの出金総額 */
  beginningMonthExpenditure: Scalars['Int']['output'];
  /** 今月の出金総額 */
  nowMonthExpenditure: Scalars['Int']['output'];
  /** 今月の出入金総額 */
  temporaryNowMonthExpenditure: Scalars['Int']['output'];
};

export type ExpenditureDataInput = {
  /** 先月までの出金総額 */
  beginningMonthExpenditure: Scalars['Int']['input'];
  /** 今月の出金総額 */
  nowMonthExpenditure: Scalars['Int']['input'];
  /** 今月の出入金総額 */
  temporaryNowMonthExpenditure: Scalars['Int']['input'];
};

export type FixedCost = {
  __typename?: 'FixedCost';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 金額 */
  amount: Scalars['Int']['output'];
  /** 説明 */
  description?: Maybe<Scalars['String']['output']>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 固定費パターン */
  pattern: FixedCostPattern;
  /** 発生日 */
  payDay: Scalars['Int']['output'];
  /** 支払い方法 */
  payment: Payment;
};

export type FixedCostPattern = {
  __typename?: 'FixedCostPattern';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 設定カラー */
  color?: Maybe<Scalars['String']['output']>;
  /** 固定費詳細 */
  detail?: Maybe<Array<FixedCost>>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
};

export type Income = {
  __typename?: 'Income';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 金額 */
  amount: Scalars['Int']['output'];
  /** 入金口座 */
  bank: Bank;
  /** 発生日 */
  depositDate: Scalars['DateTime']['output'];
  /** 説明 */
  description?: Maybe<Scalars['String']['output']>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 仮・未確定フラグ */
  temporary?: Maybe<Scalars['Boolean']['output']>;
};

export type IncomeData = {
  __typename?: 'IncomeData';
  /** 先月までの入金総額 */
  beginningMonthIncome: Scalars['Int']['output'];
  /** 今月の入金総額 */
  nowMonthIncome: Scalars['Int']['output'];
  /** 今月の仮入金総額 */
  temporaryNowMonthIncome: Scalars['Int']['output'];
};

export type IncomeDataInput = {
  /** 先月までの入金総額 */
  beginningMonthIncome: Scalars['Int']['input'];
  /** 今月の入金総額 */
  nowMonthIncome: Scalars['Int']['input'];
  /** 今月の仮入金総額 */
  temporaryNowMonthIncome: Scalars['Int']['input'];
};

export type Loan = {
  __typename?: 'Loan';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 支払い総額 */
  amount: Scalars['Int']['output'];
  /** 使用金額 */
  basePrice: Scalars['Int']['output'];
  /** 手数料 */
  commission: Scalars['Int']['output'];
  /** 出金リレーション・分割ごとの支払額 */
  detail?: Maybe<Array<Expenditure>>;
  /** 分割回数 */
  installmentsCount: Scalars['Int']['output'];
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 支払日 */
  payDay: Scalars['Int']['output'];
  /** 支払い方法 */
  payment: Payment;
  /** 利率 */
  rate: Scalars['Float']['output'];
  /** 開始日 */
  startDate: Scalars['DateTime']['output'];
};

export type MonthlyData = {
  __typename?: 'MonthlyData';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 今月の残高データ */
  bankBalances: Array<BankBalance>;
  /** 今月の利益 */
  benefit: Scalars['Int']['output'];
  /** 今月の利益（仮） */
  benefitTemporary: Scalars['Int']['output'];
  /** バッファ金額 */
  buffer: Scalars['Int']['output'];
  /** バッファ率 */
  bufferRate: Scalars['Float']['output'];
  /** 今月の出金リスト */
  expenditures: Array<Expenditure>;
  /** 固定費パターン */
  fixedCostPattern: FixedCostPattern;
  /** 今月の入金リスト */
  incomes: Array<Income>;
  /** 月 */
  month: Scalars['Int']['output'];
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 貯蓄口座 */
  savingBank: Bank;
  /** 貯蓄率 */
  savingRate: Scalars['Float']['output'];
  /** 今月の貯蓄額 */
  savings: Scalars['Int']['output'];
  /** 今月の出金総額 */
  sumExpenditure: Scalars['Int']['output'];
  /** 今月の出金総額（仮） */
  sumExpenditureTemporary: Scalars['Int']['output'];
  /** 今月の入金総額 */
  sumIncome: Scalars['Int']['output'];
  /** 今月の入金総額（仮） */
  sumIncomeTemporary: Scalars['Int']['output'];
  /** 年 */
  year: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBank: MutationSuccessResGraphQl;
  createExpenditure: MutationSuccessResGraphQl;
  createFixedCost: MutationSuccessResGraphQl;
  createFixedCostPattern: MutationSuccessResGraphQl;
  createIncome: MutationSuccessResGraphQl;
  createLoan: MutationSuccessResGraphQl;
  createMonthlyData: MutationSuccessResGraphQl;
  createPayment: MutationSuccessResGraphQl;
  createSop: MutationSuccessResGraphQl;
  createSubscriber: MutationSuccessResGraphQl;
  createTax: MutationSuccessResGraphQl;
  deleteBank: MutationSuccessResGraphQl;
  deleteExpenditure: MutationSuccessResGraphQl;
  deleteFixedCost: MutationSuccessResGraphQl;
  deleteFixedCostPattern: MutationSuccessResGraphQl;
  deleteIncome: MutationSuccessResGraphQl;
  deleteLoan: MutationSuccessResGraphQl;
  deleteMonthlyData: MutationSuccessResGraphQl;
  deletePayment: MutationSuccessResGraphQl;
  deleteSop: MutationSuccessResGraphQl;
  deleteSubscriber: MutationSuccessResGraphQl;
  deleteTax: MutationSuccessResGraphQl;
  updateBank: MutationSuccessResGraphQl;
  updateExpenditure: MutationSuccessResGraphQl;
  updateFixedCost: MutationSuccessResGraphQl;
  updateFixedCostPattern: MutationSuccessResGraphQl;
  updateIncome: MutationSuccessResGraphQl;
  updateLoan: MutationSuccessResGraphQl;
  updateMonthlyData: MutationSuccessResGraphQl;
  updatePayment: MutationSuccessResGraphQl;
  updateSop: MutationSuccessResGraphQl;
  updateSubscriber: MutationSuccessResGraphQl;
  updateTax: MutationSuccessResGraphQl;
};


export type MutationCreateBankArgs = {
  input: CreateBankInput;
};


export type MutationCreateExpenditureArgs = {
  input: CreateExpenditureInput;
};


export type MutationCreateFixedCostArgs = {
  input: CreateFixedCostInput;
};


export type MutationCreateFixedCostPatternArgs = {
  input: CreateFixedCostPatternInput;
};


export type MutationCreateIncomeArgs = {
  input: CreateIncomeInput;
};


export type MutationCreateLoanArgs = {
  input: CreateLoanInput;
};


export type MutationCreateMonthlyDataArgs = {
  input: CreateMonthlyDataInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreateSopArgs = {
  input: CreateSopInput;
};


export type MutationCreateSubscriberArgs = {
  input: CreateSubscriberInput;
};


export type MutationCreateTaxArgs = {
  input: CreateTaxInput;
};


export type MutationDeleteBankArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteExpenditureArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteFixedCostArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteFixedCostPatternArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteIncomeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteLoanArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMonthlyDataArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePaymentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSopArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSubscriberArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaxArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateBankArgs = {
  id: Scalars['String']['input'];
  input: UpdateBankInput;
};


export type MutationUpdateExpenditureArgs = {
  id: Scalars['String']['input'];
  input: UpdateExpenditureInput;
};


export type MutationUpdateFixedCostArgs = {
  id: Scalars['String']['input'];
  input: UpdateFixedCostInput;
};


export type MutationUpdateFixedCostPatternArgs = {
  id: Scalars['String']['input'];
  input: UpdateFixedCostPatternInput;
};


export type MutationUpdateIncomeArgs = {
  id: Scalars['String']['input'];
  input: UpdateIncomeInput;
};


export type MutationUpdateLoanArgs = {
  id: Scalars['String']['input'];
  input: UpdateLoanInput;
};


export type MutationUpdateMonthlyDataArgs = {
  id: Scalars['String']['input'];
  input: UpdateMonthlyDataInput;
};


export type MutationUpdatePaymentArgs = {
  id: Scalars['String']['input'];
  input: UpdatePaymentInput;
};


export type MutationUpdateSopArgs = {
  id: Scalars['String']['input'];
  input: UpdateSopInput;
};


export type MutationUpdateSubscriberArgs = {
  id: Scalars['String']['input'];
  input: UpdateSubscriberInput;
};


export type MutationUpdateTaxArgs = {
  id: Scalars['String']['input'];
  input: UpdateTaxInput;
};

export type MutationSuccessResGraphQl = {
  __typename?: 'MutationSuccessResGraphQl';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 引き落とし口座 */
  bank: Bank;
  /** 締め日 */
  closingDay: Scalars['Int']['output'];
  /** 設定カラー */
  color?: Maybe<Scalars['String']['output']>;
  /** 引き落とし日 */
  isCredit: Scalars['Boolean']['output'];
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 引き落とし日 */
  payDay: Scalars['Int']['output'];
  /** 編集不可フラグ */
  uneditable: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllBanks: Array<Bank>;
  findAllExpenditures: Array<Expenditure>;
  findAllFixedCostPatterns: Array<FixedCostPattern>;
  findAllFixedCosts: Array<FixedCost>;
  findAllIncomes: Array<Income>;
  findAllLoans: Array<Loan>;
  findAllMonthlyDatas: Array<MonthlyData>;
  findAllPayments: Array<Payment>;
  findAllSops: Array<Sop>;
  findAllSubscribers: Array<Subscriber>;
  findAllTaxs: Array<Tax>;
  findBankByID: Bank;
  findExpenditureByID: Expenditure;
  findFixedCostByID: FixedCost;
  findFixedCostPatternByID: FixedCostPattern;
  findIncomeByID: Income;
  findLoanByID: Loan;
  findMonthlyDataByID: MonthlyData;
  findPaymentByID: Payment;
  findSopByID: Sop;
  findSubscriberByID: Subscriber;
  findTaxByID: Tax;
};


export type QueryFindBankByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindExpenditureByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindFixedCostByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindFixedCostPatternByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindIncomeByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindLoanByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindMonthlyDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindPaymentByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindSopByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindSubscriberByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindTaxByIdArgs = {
  id: Scalars['String']['input'];
};

export type Sop = {
  __typename?: 'Sop';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 基本支払い額 */
  basePrice: Scalars['Float']['output'];
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 支払日 */
  payDay: Scalars['Int']['output'];
  /** 支払い方法 */
  payment: Payment;
  /** 月ごとの支払い額 */
  prices: Array<Scalars['Float']['output']>;
};

export type Subscriber = {
  __typename?: 'Subscriber';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 基本支払い額 */
  basePrice: Scalars['Float']['output'];
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 支払日 */
  payDay: Scalars['Int']['output'];
  /** 支払い方法 */
  payment: Payment;
  /** 月ごとの支払い額 */
  prices: Array<Scalars['Float']['output']>;
};

export type Tax = {
  __typename?: 'Tax';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 説明 */
  description: Scalars['String']['output'];
  /** 出金リレーション */
  detail?: Maybe<Array<Expenditure>>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 支払い方法 */
  payment: Payment;
};

export type UpdateBankInput = {
  /** 支店名 */
  branchName?: InputMaybe<Scalars['String']['input']>;
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** 出金リスト */
  expenditures?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 入金リスト */
  incomes?: InputMaybe<Array<Scalars['String']['input']>>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 支払い方法 */
  payments?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateExpenditureInput = {
  /** 金額 */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** 説明・備考 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 重複回避ID */
  duplexingAvoidanceID?: InputMaybe<Scalars['String']['input']>;
  /** 固定費リレーション */
  fixedCost?: InputMaybe<Scalars['String']['input']>;
  /** ローンリレーション */
  loan?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 発生日 */
  payDay?: InputMaybe<Scalars['DateTime']['input']>;
  /** 支払い方法 */
  payment?: InputMaybe<Scalars['String']['input']>;
  /** SOPリレーション */
  sop?: InputMaybe<Scalars['String']['input']>;
  /** 月謝リレーション */
  subscriber?: InputMaybe<Scalars['String']['input']>;
  /** 税金リレーショナル */
  tax?: InputMaybe<Scalars['String']['input']>;
  /** 仮・未確定フラグ */
  temporary?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateFixedCostInput = {
  /** 金額 */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 固定費パターン */
  pattern?: InputMaybe<Scalars['String']['input']>;
  /** 支払い方法 */
  payDay?: InputMaybe<Scalars['Int']['input']>;
  /** 発生日 */
  payment?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFixedCostPatternInput = {
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** 固定費詳細 */
  detail?: InputMaybe<Array<Scalars['String']['input']>>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateIncomeInput = {
  /** 金額 */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** 入金口座 */
  bank?: InputMaybe<Scalars['String']['input']>;
  /** 発生日 */
  depositDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 仮・未確定フラグ */
  temporary?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateLoanInput = {
  /** 支払い総額 */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** 使用金額 */
  basePrice?: InputMaybe<Scalars['Int']['input']>;
  /** 手数料 */
  commission?: InputMaybe<Scalars['Int']['input']>;
  /** 出金リレーション・分割ごとの支払額 */
  detail?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 分割回数 */
  installmentsCount?: InputMaybe<Scalars['Int']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 支払日 */
  payDay?: InputMaybe<Scalars['Int']['input']>;
  /** 支払い方法 */
  payment?: InputMaybe<Scalars['String']['input']>;
  /** 利率 */
  rate?: InputMaybe<Scalars['Float']['input']>;
  /** 開始日 */
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateMonthlyDataInput = {
  /** 今月の残高データ */
  bankBalances?: InputMaybe<Array<CreateBankBalanceInput>>;
  /** 今月の利益 */
  benefit?: InputMaybe<Scalars['Int']['input']>;
  /** 今月の利益（仮） */
  benefitTemporary?: InputMaybe<Scalars['Int']['input']>;
  /** バッファ金額 */
  buffer?: InputMaybe<Scalars['Int']['input']>;
  /** バッファ率 */
  bufferRate?: InputMaybe<Scalars['Float']['input']>;
  /** 今月の出金リスト */
  expenditures?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 固定費パターン */
  fixedCostPattern?: InputMaybe<Scalars['String']['input']>;
  /** 今月の入金リスト */
  incomes?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 月 */
  month?: InputMaybe<Scalars['Int']['input']>;
  /** アイテム名・ここでは使わない */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 貯蓄口座 */
  savingBank?: InputMaybe<Scalars['String']['input']>;
  /** 貯蓄率 */
  savingRate?: InputMaybe<Scalars['Float']['input']>;
  /** 今月の貯蓄額 */
  savings?: InputMaybe<Scalars['Int']['input']>;
  /** 今月の出金総額 */
  sumExpenditure?: InputMaybe<Scalars['Int']['input']>;
  /** 今月の出金総額（仮） */
  sumExpenditureTemporary?: InputMaybe<Scalars['Int']['input']>;
  /** 今月の入金総額 */
  sumIncome?: InputMaybe<Scalars['Int']['input']>;
  /** 今月の入金総額（仮） */
  sumIncomeTemporary?: InputMaybe<Scalars['Int']['input']>;
  /** 年 */
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatePaymentInput = {
  /** 引き落とし口座 */
  bank?: InputMaybe<Scalars['String']['input']>;
  /** 締め日 */
  closingDay?: InputMaybe<Scalars['Int']['input']>;
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** 支払日 */
  isCredit?: InputMaybe<Scalars['Int']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 引き落とし日 */
  payDay?: InputMaybe<Scalars['Int']['input']>;
  /** 編集不可フラグ */
  uneditable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateSopInput = {
  /** 基本支払い額 */
  basePrice?: InputMaybe<Scalars['Int']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 支払日 */
  payDay?: InputMaybe<Scalars['Int']['input']>;
  /** 支払い方法 */
  payment?: InputMaybe<Scalars['String']['input']>;
  /** 月額支払額 */
  prices?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateSubscriberInput = {
  /** 基本支払い額 */
  basePrice?: InputMaybe<Scalars['Int']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 支払日 */
  payDay?: InputMaybe<Scalars['Int']['input']>;
  /** 支払い方法 */
  payment?: InputMaybe<Scalars['String']['input']>;
  /** 月額支払額 */
  prices?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateTaxInput = {
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 出金リレーション */
  detail?: InputMaybe<Array<Scalars['String']['input']>>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 支払い方法 */
  payment?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBankMutationVariables = Exact<{
  input: CreateBankInput;
}>;


export type CreateBankMutation = { __typename?: 'Mutation', createBank: { __typename?: 'MutationSuccessResGraphQl', message: string, success: boolean } };

export type FindAllBanksQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllBanksQuery = { __typename?: 'Query', findAllBanks: Array<{ __typename?: 'Bank', _id: string, branchName?: string | null, name: string }> };

export type FindAllPaymentsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllPaymentsQuery = { __typename?: 'Query', findAllPayments: Array<{ __typename?: 'Payment', _id: string, closingDay: number, color?: string | null, isCredit: boolean, name: string, payDay: number, uneditable: boolean, bank: { __typename?: 'Bank', _id: string, branchName?: string | null, name: string, color?: string | null } }> };

export type FindBankByIdQueryVariables = Exact<{
  findBankByIdId: Scalars['String']['input'];
}>;


export type FindBankByIdQuery = { __typename?: 'Query', findBankByID: { __typename?: 'Bank', _id: string, name: string, color?: string | null, branchName?: string | null, payments: Array<{ __typename?: 'Payment', _id: string, name: string, payDay: number, color?: string | null, bank: { __typename?: 'Bank', _id: string, name: string, color?: string | null } }>, incomes: Array<{ __typename?: 'Income', _id: string, name: string, description?: string | null, amount: number, depositDate: any, temporary?: boolean | null }>, expenditures: Array<{ __typename?: 'Expenditure', _id: string, name: string, description?: string | null, amount: number, payDay: any, temporary?: boolean | null, duplexingAvoidanceID?: string | null, tax?: { __typename?: 'Tax', _id: string, name: string } | null, loan?: { __typename?: 'Loan', _id: string, name: string } | null, fixedCost?: { __typename?: 'FixedCost', _id: string, name: string } | null, sop?: { __typename?: 'Sop', _id: string, name: string } | null, subscriber?: { __typename?: 'Subscriber', _id: string, name: string } | null, payment: { __typename?: 'Payment', _id: string, color?: string | null, name: string, payDay: number } }> } };

export type UpdateBankMutationVariables = Exact<{
  updateBankId: Scalars['String']['input'];
  input: UpdateBankInput;
}>;


export type UpdateBankMutation = { __typename?: 'Mutation', updateBank: { __typename?: 'MutationSuccessResGraphQl', success: boolean, message: string } };


export const CreateBankDocument = gql`
    mutation CreateBank($input: CreateBankInput!) {
  createBank(input: $input) {
    message
    success
  }
}
    `;
export type CreateBankMutationFn = Apollo.MutationFunction<CreateBankMutation, CreateBankMutationVariables>;

/**
 * __useCreateBankMutation__
 *
 * To run a mutation, you first call `useCreateBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBankMutation, { data, loading, error }] = useCreateBankMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBankMutation(baseOptions?: Apollo.MutationHookOptions<CreateBankMutation, CreateBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBankMutation, CreateBankMutationVariables>(CreateBankDocument, options);
      }
export type CreateBankMutationHookResult = ReturnType<typeof useCreateBankMutation>;
export type CreateBankMutationResult = Apollo.MutationResult<CreateBankMutation>;
export type CreateBankMutationOptions = Apollo.BaseMutationOptions<CreateBankMutation, CreateBankMutationVariables>;
export const FindAllBanksDocument = gql`
    query FindAllBanks {
  findAllBanks {
    _id
    branchName
    name
  }
}
    `;

/**
 * __useFindAllBanksQuery__
 *
 * To run a query within a React component, call `useFindAllBanksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllBanksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllBanksQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllBanksQuery(baseOptions?: Apollo.QueryHookOptions<FindAllBanksQuery, FindAllBanksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllBanksQuery, FindAllBanksQueryVariables>(FindAllBanksDocument, options);
      }
export function useFindAllBanksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllBanksQuery, FindAllBanksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllBanksQuery, FindAllBanksQueryVariables>(FindAllBanksDocument, options);
        }
export function useFindAllBanksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllBanksQuery, FindAllBanksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllBanksQuery, FindAllBanksQueryVariables>(FindAllBanksDocument, options);
        }
export type FindAllBanksQueryHookResult = ReturnType<typeof useFindAllBanksQuery>;
export type FindAllBanksLazyQueryHookResult = ReturnType<typeof useFindAllBanksLazyQuery>;
export type FindAllBanksSuspenseQueryHookResult = ReturnType<typeof useFindAllBanksSuspenseQuery>;
export type FindAllBanksQueryResult = Apollo.QueryResult<FindAllBanksQuery, FindAllBanksQueryVariables>;
export const FindAllPaymentsDocument = gql`
    query FindAllPayments {
  findAllPayments {
    _id
    bank {
      _id
      branchName
      name
      color
    }
    closingDay
    color
    isCredit
    name
    payDay
    uneditable
  }
}
    `;

/**
 * __useFindAllPaymentsQuery__
 *
 * To run a query within a React component, call `useFindAllPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllPaymentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllPaymentsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>(FindAllPaymentsDocument, options);
      }
export function useFindAllPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>(FindAllPaymentsDocument, options);
        }
export function useFindAllPaymentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>(FindAllPaymentsDocument, options);
        }
export type FindAllPaymentsQueryHookResult = ReturnType<typeof useFindAllPaymentsQuery>;
export type FindAllPaymentsLazyQueryHookResult = ReturnType<typeof useFindAllPaymentsLazyQuery>;
export type FindAllPaymentsSuspenseQueryHookResult = ReturnType<typeof useFindAllPaymentsSuspenseQuery>;
export type FindAllPaymentsQueryResult = Apollo.QueryResult<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>;
export const FindBankByIdDocument = gql`
    query FindBankByID($findBankByIdId: String!) {
  findBankByID(id: $findBankByIdId) {
    _id
    name
    payments {
      _id
      name
      payDay
      bank {
        _id
        name
        color
      }
      color
    }
    color
    incomes {
      _id
      name
      description
      amount
      depositDate
      temporary
    }
    expenditures {
      _id
      name
      description
      amount
      payDay
      temporary
      tax {
        _id
        name
      }
      loan {
        _id
        name
      }
      fixedCost {
        _id
        name
      }
      sop {
        _id
        name
      }
      subscriber {
        _id
        name
      }
      duplexingAvoidanceID
      payment {
        _id
        color
        name
        payDay
      }
    }
    branchName
  }
}
    `;

/**
 * __useFindBankByIdQuery__
 *
 * To run a query within a React component, call `useFindBankByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindBankByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindBankByIdQuery({
 *   variables: {
 *      findBankByIdId: // value for 'findBankByIdId'
 *   },
 * });
 */
export function useFindBankByIdQuery(baseOptions: Apollo.QueryHookOptions<FindBankByIdQuery, FindBankByIdQueryVariables> & ({ variables: FindBankByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindBankByIdQuery, FindBankByIdQueryVariables>(FindBankByIdDocument, options);
      }
export function useFindBankByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindBankByIdQuery, FindBankByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindBankByIdQuery, FindBankByIdQueryVariables>(FindBankByIdDocument, options);
        }
export function useFindBankByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindBankByIdQuery, FindBankByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindBankByIdQuery, FindBankByIdQueryVariables>(FindBankByIdDocument, options);
        }
export type FindBankByIdQueryHookResult = ReturnType<typeof useFindBankByIdQuery>;
export type FindBankByIdLazyQueryHookResult = ReturnType<typeof useFindBankByIdLazyQuery>;
export type FindBankByIdSuspenseQueryHookResult = ReturnType<typeof useFindBankByIdSuspenseQuery>;
export type FindBankByIdQueryResult = Apollo.QueryResult<FindBankByIdQuery, FindBankByIdQueryVariables>;
export const UpdateBankDocument = gql`
    mutation UpdateBank($updateBankId: String!, $input: UpdateBankInput!) {
  updateBank(id: $updateBankId, input: $input) {
    success
    message
  }
}
    `;
export type UpdateBankMutationFn = Apollo.MutationFunction<UpdateBankMutation, UpdateBankMutationVariables>;

/**
 * __useUpdateBankMutation__
 *
 * To run a mutation, you first call `useUpdateBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBankMutation, { data, loading, error }] = useUpdateBankMutation({
 *   variables: {
 *      updateBankId: // value for 'updateBankId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBankMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBankMutation, UpdateBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBankMutation, UpdateBankMutationVariables>(UpdateBankDocument, options);
      }
export type UpdateBankMutationHookResult = ReturnType<typeof useUpdateBankMutation>;
export type UpdateBankMutationResult = Apollo.MutationResult<UpdateBankMutation>;
export type UpdateBankMutationOptions = Apollo.BaseMutationOptions<UpdateBankMutation, UpdateBankMutationVariables>;