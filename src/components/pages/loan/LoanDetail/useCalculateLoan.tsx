import { useWatch } from 'react-hook-form'

import * as chrFormatChange from '@/utils/chrFormatChange'

import type { ControlType } from '@/types/form/InputAttribute'

type LoanDetails = {
  loanAmount: number;
  annualInterestRate: number; // 年利（%）
  numberOfPayments: number; // 分割回数
};

type LoanCalculationResult = {
  monthlyPayment: number;
  firstPayment: number;
  totalPayment: number;
};

export const useCalculateLoan = (
  control: ControlType
) => {
  const { parsePercentageToDecimal, removeComma } = chrFormatChange

  const loanNameValue = useWatch({ control, name: 'loanName' }) as string
  const basePriceValue = useWatch({ control, name: 'basePrice' }) as string
  const rateValue = useWatch({ control, name: 'rate' }) as string
  const installmentsCountValue = useWatch({ control, name: 'installmentsCount' }) as string

  const calculateLoanDetails = (details: LoanDetails): LoanCalculationResult => {
    const { loanAmount, annualInterestRate, numberOfPayments } = details

    // 月利の計算
    const monthlyInterestRate = annualInterestRate / 12 / 100

    // 月々の支払額の計算（元利均等返済方式）
    const monthlyPayment = loanAmount *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)

    // 総支払額の計算
    const totalPayment = monthlyPayment * numberOfPayments

    // 初回支払額の計算（ここでは月々の支払額と同じ）
    const firstPayment = monthlyPayment

    return {
      monthlyPayment: Math.round(monthlyPayment),
      firstPayment: Math.round(firstPayment),
      totalPayment: Math.round(totalPayment),
    }
  }

  const inputDetails: LoanDetails = {
    loanAmount: Number(removeComma(basePriceValue)), // 3000万円
    annualInterestRate: parsePercentageToDecimal(rateValue) ?? 0, // 年利3%
    numberOfPayments: Number(installmentsCountValue), // 30年（360回払い）
  }

  const result = calculateLoanDetails(inputDetails)

  return {
    loanNameValue,
    inputDetails,
    result
  }
}
