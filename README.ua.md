<h1 align="center">Aleo SDK</h1>

<p align="center">
    <a href="https://circleci.com/gh/AleoHQ/aleo"><img src="https://circleci.com/gh/AleoHQ/sdk.svg?style=svg"></a>
    <a href="https://codecov.io/gh/AleoHQ/aleo"><img src="https://codecov.io/gh/AleoHQ/aleo/branch/main/graph/badge.svg?token=HIVCMHYMTZ"/></a>
    <a href="https://discord.gg/5v2ynrw2ds"><img src="https://img.shields.io/discord/700454073459015690?logo=discord"/></a>
</p>

Aleo SDK це розробницький фреймворк, який спрощує створення нового облікового запису, формування транзакції та її розсилання в мережу.

## Зміст

* [1. Огляд](#1-огляд)
* [2. Посібник зі збірки](#2-посібник-зі-збірки)
* [3. Посібник з використання](#3-посібник-з-використання)

## 1. Огляд

[Репозиторій Aleo на github](https://github.com/AleoHQ/sdk) включає:
1. [`sdk/`](https://github.com/AleoHQ/sdk) - Aleo SDK на Rust https://crates.io/crates/aleo
2. [`sdk/sdk`](https://github.com/AleoHQ/sdk/tree/testnet3/sdk) - Aleo SDK на Javascript https://www.npmjs.com/package/@aleohq/sdk
3. [`sdk/wasm`](https://github.com/AleoHQ/sdk/tree/testnet3/wasm) - Aleo Wasm бібліотека на Rust https://crates.io/crates/aleo-wasm
4. [`sdk/wasm/pkg`](https://github.com/AleoHQ/sdk/tree/testnet3/wasm) - Aleo Wasm бібліотека на JavaScript https://www.npmjs.com/package/@aleohq/wasm

Ми рекомендуємо розробникам використовувати інтерфейси, що надаються SDK Aleo (1. та 2.) для їх відповідних мов.

Для отримання додаткової інформації про Aleo відвідайте [Welcome to Aleo](https://developer.aleo.org/overview/) to get started.

## 2. Посібник зі збірки

### 2.1 Установка Rust

Ми рекомендуємо встановити Rust за допомогою [rustup](https://www.rustup.rs/). Ви можете встановити `rustup` таким чином:

- macOS або Linux:
  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

- Windows (64-bit):

 Завантажте [Windows 64-bit виконуваний файл](https://win.rustup.rs/x86_64) or
  [Windows 32-bit виконуваний файл](https://win.rustup.rs/i686) та слідуйте інструкціям на екрані.
  
### 2.2 Збірка з вихідного коду

Ми рекомендуємо інсталяцію `aleo` таким чином. Виконайте в терміналі:

```bash
# Завантажте вихідний код
git clone https://github.com/AleoHQ/sdk.git

# Перейдіть до директорії 'sdk'
cd sdk

# Встановіть 'aleo'
cargo install --path .
```

Тепер, щоб використовувати `aleo`, виконайте в терміналі:
```bash
aleo
```

## 3. Посібник з використання

### 3.1 Створення нового аккаунту Aleo

Щоб створити новий аккаунт Aleo, виконайте:
```bash
aleo account new [FLAGS] [OPTIONS]
```

Команду можна виконати з наступними необов'язковими параметрами:
```
FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
    -s, --seed <seed>
```

### 3.2 Створення та збірка нового проекту

Щоб створити новий проект, ми використовуємо команду `new`. Наш проект:

``` bash
aleo new foo
```

Це створить директорію **foo** та файли з базовою структурою проекту:

- **README.md** містить "skeleton" README з інструкціями про компіляцію.
- **main.aleo** головний файл вихідного коду.
- **program.json** містить ідентифікацію проекту в форматі JSON. Зокрема, dev-адресу та її приватний ключ для програми.

Файл main.aleo повинен містити такий вміст:

```
//  Програма 'foo.aleo'.
program foo.aleo;

function hello:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;
```

Для компіляції проекту запустіть у головній директорії:

``` bash
aleo build
```

Ви побачите вивід подібний до цього:

```
⏳ Compiling 'foo.aleo'...
 • Loaded universal setup (in 1478 ms)
 • Built 'hello' (in 3250 ms)
✅ Built 'foo.aleo' (in "~/foo")
```

Спочатку "універсальний інсталювальний файл" завантажується у ваше середовище. Про це ви можете прочитати більше [тут](https://www.aleo.org/post/announcing-aleo-setup) або в [Marlin paper](https://eprint.iacr.org/2019/1047.pdf).

Як тільки універсальний набір готовий, кожна функція у вашому файлі main.aleo будується, генеруючи наступне у вихідній папці:

- **hello.prover** доказувач для функції `hello`.
- **hello.verifier** верифікатор для функції `hello`.
- **main.avm** байткод вашої програми aleo, яку буде виконувати VM.

Як ви вже, мабуть, здогадалися, у нас є лише один файл `.avm` для всієї програми, але доказувач і верифікатор для кожної функції.
### 3.3 Виконання програми

Ви можете запустити програму командою `aleo run`, за якою слідує назва функції, яку ви хочете виконати, та її вхідні параметри

``` bash
aleo run hello 2u32 3u32
```

Після завершення виконання ви повинні побачити такий вивід:

``` bash
🚀 Executing 'foo.aleo/hello'...
 • Calling 'foo.aleo/hello'...
 • Executed 'hello' (in 1170 ms)
➡️  Output
 • 5u32
✅ Executed 'foo.aleo/hello' (in "[...]/foo")
```

Як ви можете бачити, регістр виводу був присвоєний значенням `5u32`, що представляє суму вхідних даних.

### 3.4 Огляд програми

Давайте розглянемо програму foo всередині файлу *main.aleo*:

```
// Програма  'foo.aleo'.
program foo.aleo;

function hello:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;
```

По-перше, нам потрібно розкрити програму наступним чином:

```
program foo.aleo;
```

Після цього ми можемо почати писати її функції (або інші структури Aleo, такі як структури, записи, замикання, як ми побачимо пізніше).

У випадку функцій у нас все дуже просто:

```
function [function_name]:
```

Функції складаються з трьох основних частин:

- **Розділ вводу**

  Тут ми оголошуємо його вхідні параметри:
  ```
      input r0 as u32.public;
      input r1 as u32.private;
  ```
 Все в інструкціях Aleo оголошується/зберігається всередині регістру з типом (`i8`,`field`,`bool`, і т.д.) і опцією видимості (`public` або `private`), регістри називаються `r0`, `r1`, ..., `rn`.

  У цьому випадку ми використовуємо `r0` і `r1` для зберігання вводу, переданого в послідовному порядку до програми як значення `u32`, де ми можемо зберігати 32-бітні беззнакові цілі числа для виконання нашої операції додавання.

- **Розділ інструкцій**

 Наступний розділ складається з ядра нашої функції, тут ми викликаємо кількість інструкцій Aleo, які нам потрібні, щоб наша програма робила те, що ми хочемо. Наприклад, виконання операції додавання:
  ```
      add r0 r1 into r2;
  ```
 Кожна інструкція Aleo супроводжується вхідними параметрами з їх конкретними типами, а результат зберігається у регістрі *into*.

 Ви можете знайти всі доступні інструкції aleo [тут](https://hackmd.io/@aleo/SJ0mrYRv5#shr).

- **Розділ виводу**

  Аналогічно розділу вводу, розділ виводу робить те саме для виводу програми. Це повернення функції.
  ```
      output r2 as u32.private;
  ```

### 3.5 Типи

Aleo використовує синтаксис з сильною типізацією. Мова підтримує 16 примітивних типів і дозволяє користувачам визначати власні типи.

Примітивні типи Aleo включають:
```
address
boolean
field
group
i8
i16
i32
i64
i128
u8
u16
u32
u64
u128
scalar
string
```

Користувачі можуть визначати власні типи, використовуючи ключові слова `structs` або `record` keywords. Ми розглянемо ці розділи трохи пізніше.

#### 3.5.1 Регістри

Регістри - це місця, де ви зберігаєте дані, щоб потім мати змогу їх змінювати.

#### 3.5.2 Інтерфейси

Інтерфейси - це визначені користувачем структури даних. Вони дуже схожі на традиційні структури у звичайних мовах програмування. Ви можете зберігати структури в регістрах, як і будь-які інші типи даних Aleo.

Наприклад, давайте створимо структуру, що представляє масив фіксованого розміру з 3 елементів. Додайте його в кінець файлу *main.aleo*:

```
struct array3:
    a0 as u32;
    a1 as u32;
    a2 as u32;
```

Тепер, лише для прикладу, давайте напишемо функцію, яка додає одиницю до кожного елемента регістру з типом даних `array3`, що зберігається в ньому.

```
function sum_one_to_array3:
    input r0 as array3.private;
    add r0.a0 1u32 into r1;
    add r0.a1 1u32 into r2;
    add r0.a2 1u32 into r3;
    cast r1 r2 r3 into r4 as array3;
    output r4 as array3.private;
```

Як ви можете бачити, ми можемо ввести структуру в регістр `r0` і отримати доступ до елементів структури за допомогою синтаксису `.`.  Ми виконуємо інструкцію `add` для кожного елемента, зберігаючи результати в регістрах `r1`, `r2` and `r3`і, нарешті, ми використовуємо команду cast, щоб створити нову структуру `array3` в `r4`.

Тепер давайте запустимо його. У цьому випадку єдине нове, що вам потрібно знати, це те, що структури передаються до CLI в наступному форматі:
```
"{a0: 1u32, a1: 2u32, a2: 3u32}"
```

Тепер ми можемо виконати команду `aleo run`. Ми очистимо проект, щоб підібрати новий код:

```
aleo clean && aleo run sum_one_to_array3 "{a0: 0u32, a1: 1u32, a2: 2u32}"
```

І отримуємо на виході новий елемент `array3`:

```
🚀 Executing 'foo.aleo/sum_one_to_array3'...
 • Calling 'foo.aleo/sum_one_to_array3'...
 • Executed 'sum_one_to_array3' (in 1331 ms)
➡️  Output
 • {
  a0: 1u32,
  a1: 2u32,
  a2: 3u32
}
✅ Executed 'foo.aleo/sum_one_to_array3' (in "[...]/foo")
```

#### 3.5.3 Записи

Запис - це фундаментальна структура даних для кодування активів користувача та стану програми. Вони дуже схожі на структури, але мають два обов'язкових параметри:

```
record token:
    owner as address.private
    gates as u64.private
```

`owner` відноситься до адреси Aleo, яка є власником запису, а  `gates`- це кількість кредитів, які запис може витратити.

Записи важливі, тому що вони представляють базову структуру Aleo для обробки стану у вашому додатку.

Під час запуску функції Aleo у вхідні регістри можна передавати лише записи, що належать до адреси програми. В іншому випадку буде видано помилку, і програма не буде запущена.

Ви можете знайти адресу вашого додатка для розробки всередині файлу *program.json*:


```
{
    "program": "foo.aleo",
    "version": "0.0.0",
    "description": "",
    "development": {
        "private_key": "APrivateKey1zkpFsQNXJwdvjKs9bRsM91KcwJW1gW4CDtF3FJbgVBAvPds",
        "address": "aleo1x5nz5u4j50w482t5xtqc3jdwly9s8saaxlgjz0wvmuzmxv2l5q9qmypx09"
    },
    "license": "MIT"
}
```

#### 3.5.4 Стан Aleo

У Aleo стан додатка керується через записи. Акаунт Aleo може створити транзакцію для споживання запису і виробництва нового запису на його місце. Записи в Aleo зашифровані до адреси власника запису, гарантуючи повну приватність всіх записів в Aleo.

### 3.6 Ваша перша програма Aleo: Проведення переказу


Розгляньте цю програму:
```
// Програма 'foo.aleo'.
program foo.aleo;
record token:
    owner as address.private;
    gates as u64.private;
    amount as u64.private;
function transfer_amount:
    //  sender token record
    input r0 as token.record;
    // receiver address
    input r1 as address.private;
    // amount to transfer
    input r2 as u64.private;
    // final balance of sender
    sub r0.amount r2 into r3;
    // final balance of receiver
    add 0u64 r2 into r4;
    // sender token record after the transfer
    cast r0.owner r0.gates r3 into r5 as token.record;
    // receiver token record after the transfer
    cast r1 0u64 r4 into r6 as token.record;
    // sender new token record
    output r5 as token.record;
    // receiver new token record
    output r6 as token.record;
```
Спочатку ми визначаємо наш власний тип даних запису під назвою `token`, який має два обов'язкових параметри, `owner` та `gates`, і користувацький параметр під назвою  `amount`, що представляє кількість токенів, які ми маємо.

Ця функція `transfer_amount` отримує 3 вхідних параметри (`sender` запис, `receiver` адресу та `amount`) та зберігає їх у 3 регістрах (`r0`, `r1` та `r2`). Після цього вона обчислює кінцевий баланс для обох і зберігає його в `r3` та `r4` (використовуючи інструкції **sub** та **add** для обчислення віднімання та додавання відповідно). З цими кінцевими сумами вона створює вихідні записи для відправника та отримувача, зберігаючи їх у `r5` та `r6`. Нарешті, обидва записи відправляються з функції за допомогою інструкції *output*.

Щоб запустити цю функцію, перший параметр - це вхідний запис програми. Формат цього параметра такий же, як і для типів структур:

```
{
  owner: aleo1x5nz5u4j50w482t5xtqc3jdwly9s8saaxlgjz0wvmuzmxv2l5q9qmypx09.private,
  gates: 0u64.private,
  amount: 50u64.private
}
```

Де:

- owner: публічна адреса програми, яка знайдена в `development.address` файлу build/program.json.
- gates: "gates", які мають запис.
- інші параметри: залежно від самої програми (в цьому прикладі ми використовуємо параметр amount зі значенням 50).

Давайте запустимо функцію `transfer_amount` (якщо ви слідкуєте за цим, пам'ятайте використовувати адресу, знайдену в program.json для поля owner):

``` bash
aleo clean && aleo run transfer_amount "{
owner: aleo1x5nz5u4j50w482t5xtqc3jdwly9s8saaxlgjz0wvmuzmxv2l5q9qmypx09.private,
gates: 0u64.private,
amount: 50u64.private
}" aleo1h3gu7fky36y8r7v2x9phc434fgf20g8qd7c7u45v269jfw6vmugqjegcvp 10u64
```

Ми отримуємо наступні вихідні записи:

```
🚀 Executing 'foo.aleo/transfer_amount'...
 • Calling 'foo.aleo/transfer_amount'...
 • Executed 'transfer_amount' (in 3520 ms)
➡️  Outputs
 • {
  owner: aleo1x5nz5u4j50w482t5xtqc3jdwly9s8saaxlgjz0wvmuzmxv2l5q9qmypx09.private,
  gates: 0u64.private,
  amount: 40u64.private
  _nonce: 2293253577170800572742339369209137467208538700597121244293392265726446806023group.public
}
 • {
  owner: aleo1h3gu7fky36y8r7v2x9phc434fgf20g8qd7c7u45v269jfw6vmugqjegcvp.private,
  gates: 0u64.private,
  amount: 10u64.private
  _nonce: 2323253577170856894742339369235137467208538700597121244293392765726742543235group.public
}
✅ Executed 'foo.aleo/transfer_amount' (in "[...]/foo")
```

І все. Ви передали свої перші власні визначені токени в Aleo!

Зверніть увагу: `_nonce` не записаний в інструкціях Aleo. Компілятор виводить _nonce в вихідних записах. Користувачеві потрібно вказати його як вхідний параметр при використанні запису.

[//]: # (### 3.7 Decrypt an Aleo record ciphertext.)

[//]: # ()
[//]: # (To decrypt a record and view its contexts, run:)

[//]: # (```bash)

[//]: # (aleo record from [FLAGS] [OPTIONS])

[//]: # (```)

[//]: # ()
[//]: # (The command can be run with the following optional parameters:)

[//]: # (```)

[//]: # (FLAGS:)

[//]: # (    -h, --help       Prints help information)

[//]: # (    -V, --version    Prints version information)

[//]: # ()
[//]: # (OPTIONS:)

[//]: # (    -c, --ciphertext <ciphertext> &#40;required&#41; The cipherext hex string.)

[//]: # (    -k, --viewkey <view-key> &#40;required&#41; The Aleo view key string to decrypt the ciphertext.)

[//]: # (```)
