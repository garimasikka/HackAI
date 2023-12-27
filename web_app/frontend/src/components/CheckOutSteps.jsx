

function CheckOutSteps({step1, step2, step3, step4}) {
  return (
    <div className="flex justify-center">
        <ul className="steps">
            <li className={step1 ? "step step-primary" : "step"}>Sign In</li>
            <li className={step2 ? "step step-primary" : "step"}>Shipping</li>
            <li className={step3 ? "step step-primary" : "step"}>Payment</li>
            <li className={step4 ? "step step-primary" : "step"}>Place Order</li>
        </ul>
    </div>
  )
}

export default CheckOutSteps