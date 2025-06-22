'use strict';

//Data
const account1 = {
  owner: 'Moses Munyi',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 600, -1000],
  interestRate: 1.2, //%
  pin: 1111,
  type: 'premium',

  movementsDates: [
    '2025-06-02T09:15:00.000Z',
    '2025-06-04T14:30:00.000Z',
    '2025-06-07T11:45:00.000Z',
    '2025-06-10T08:20:00.000Z',
    '2025-06-13T16:05:00.000Z',
    '2025-06-16T12:00:00.000Z',
    '2025-06-18T10:40:00.000Z',
    '2025-06-18T17:15:00.000Z',
    '2025-06-19T17:15:00.000Z',
    '2025-06-20T18:55:00.000Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'Standard',
  movementsDates: [
    '2025-06-01T07:10:00.000Z',
    '2025-06-03T13:25:00.000Z',
    '2025-06-05T09:00:00.000Z',
    '2025-06-08T15:45:00.000Z',
    '2025-06-11T11:30:00.000Z',
    '2025-06-14T17:15:00.000Z',
    '2025-06-17T10:50:00.000Z',
    '2025-06-18T17:15:00.000Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Stephen Thomas Williams',
  movements: [200, -200, 340, -20, 50, 400, -460],
  interestRate: 1.7,
  pin: 3333,
  type: 'premium',
  movementsDates: [
    '2025-06-01T07:10:00.000Z',
    '2025-06-03T13:25:00.000Z',
    '2025-06-05T09:00:00.000Z',
    '2025-06-08T15:45:00.000Z',
    '2025-06-11T11:30:00.000Z',
    '2025-06-14T17:15:00.000Z',
    '2025-06-17T10:50:00.000Z',
  ],
  currency: 'EUR',
  locale: 'de-De',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
  movementsDates: [
    '2025-06-01T07:10:00.000Z',
    '2025-06-03T13:25:00.000Z',
    '2025-06-05T09:00:00.000Z',
    '2025-06-08T15:45:00.000Z',
    '2025-06-11T11:30:00.000Z',
  ],
  currency: 'ksh',
  locale: 'en-KE',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance_value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login_btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login_input--user');
const inputLoginPin = document.querySelector('.login_input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

////displaying the cash movement for moses maina
//use

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth()}`.padStart(2, 0);
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`;

    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  //empty the entire container and start adding new elements
  containerMovements.innerHTML = ''; //innerHTML returns everything including the tags

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDates = formatMovementDate(date, acc.locale);

    // const formattedMov = new Intl.NumberFormat(acc.locale, {
    //   style: 'currency',
    //   currency: acc.currency,
    // }).format(mov);

    const formattedMov = formCur(mov, acc.locale, acc.currency);

    const html = `
         <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDates}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Displaying the balance
const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  // const formattedMov = new Intl.NumberFormat(acc.locale, {
  //   style: 'currency',
  //   currency: acc.currency,
  // }).format(mov);

  labelBalance.textContent = `${formCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formCur(out, acc.locale, acc.currency);

  //chaining
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate.toFixed(2)) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    //forEach to produce the side effect, without returning anything
    acc.username = acc.owner
      .toLowerCase()
      .split(' ') // will create an array
      .map(name => name[0]) //returns only a value and does not produce a side effect
      .join('');
  }); // no need to return since we are not returning anything
};

createUsernames(accounts);

const updateUI = function (acc) {
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

// //Fake always loggined in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0); //remember padStart works with string and hence, we call padStart(two characters long, 'pad it with zero')
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);

//Display it in day/Month/Year
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

let timer;

const startLogoutTimer = function () {
  let time = 10;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //in each call print the remaning time to the UI
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Login to get Started';
      containerApp.style.opacity = 0;
    }
    //Decrease 1sec
    time--;
    // when the time is zero, stop the time and logout the time
  };
  //Call the tick function immediately
  tick();
  //call the timer everysecond
  const timer = setInterval(tick, 1000);
  return timer; // to use the timer return is as a variable, this is important becuase we wil use it to clear the timer
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Thepage reloads because is the default behavrious of a click button and we need to stop it through adding a parameter
  e.preventDefault();
  //   find the account of the user
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  ); // save a variable holding this information outside this function because we need to remember it in other actins e.g transfering the money

  if (currentAccount.pin === Math.floor(inputLoginPin.value)) {
    //Display UI and Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`; //display first Name only
    // clear input fields

    //Experimenting Internationalization API
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    //getting locale from the users browser

    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur(); //loosing focus
    containerApp.style.opacity = 100;
    // Display Movement

    //if there is timer, then clear timer
    if (timer) clearInterval(timer);
    //start the LogoutTimer
    timer = startLogoutTimer(); // use the returned timer

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    //Doin the Transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    //add Dates
    currentAccount.movementsDates.push(new Date());
    receiverAccount.movementsDates.push(new Date());

    //Update UI
    updateUI(currentAccount);

    //reseting the timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

//Providing a Loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //Add the Movement
      currentAccount.movements.push(amount);

      //
      //add Loand Dates
      currentAccount.movementsDates.push(new Date());
      //Update UI
      updateUI(currentAccount);
    }, 2500);
    //reseting the timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
  inputLoanAmount.value = '';
});

///Closing an account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    console.log(index);
    //Delete Account
    accounts.splice(index, 1); // remember the splice method mutates the original array, so it will update the accounts account without the deleted data

    //Hide UI
    containerApp.style.opacity = 0;
  }
  //Hide the logins
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
