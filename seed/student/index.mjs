const apiUrl = process.env.VITE_API_URL?.replace(/\/+$/, '');
const apiToken = process.env.API_TOKEN;
const password = '12345678';

if (!apiUrl) {
  throw new Error('VITE_API_URL is required in .env');
}

if (!apiToken) {
  throw new Error('API_TOKEN is required in .env');
}

const authorization = apiToken.startsWith('Bearer ') ? apiToken : `Bearer ${apiToken}`;

const maleFirstNames = [
  'Abdulaziz',
  'Abdulloh',
  'Akbar',
  'Akmal',
  'Alisher',
  'Anvar',
  'Asadbek',
  'Aziz',
  'Bekzod',
  'Bobur',
  'Diyor',
  'Doniyor',
  'Doston',
  'Elyor',
  'Farrux',
  'Ibrohim',
  'Islom',
  'Jahongir',
  'Jasur',
  'Javohir',
  'Kamol',
  'Laziz',
  'Mirjalol',
  'Muhammadali',
  'Murod',
  'Nodir',
  'Otabek',
  'Oybek',
  'Ozodbek',
  'Rustam',
  'Said',
  'Sanjar',
  'Sardor',
  'Sherzod',
  'Shoxrux',
  'Sirojiddin',
  'Temur',
  'Ulugbek',
  'Umid',
  'Xurshid',
  'Yusuf',
  'Zafar',
  'Zohid',
  'Abror',
  'Azamat',
  'Behruz',
  'Davron',
  'Ilhom',
  'Komil',
  'Suhrob'
];

const femaleFirstNames = [
  'Aziza',
  'Barno',
  'Dildora',
  'Dilfuza',
  'Dilnoza',
  'Diyora',
  'Farangiz',
  'Feruza',
  'Gavhar',
  'Gulchehra',
  'Gulnoza',
  'Iroda',
  'Kamola',
  'Laylo',
  'Madina',
  'Maftuna',
  'Malika',
  'Mohira',
  'Munisa',
  'Nafisa',
  'Nasiba',
  'Nigina',
  'Nilufar',
  'Nodira',
  'Oysha',
  'Rayhona',
  'Sabina',
  'Sevara',
  'Shahnoza',
  'Shahzoda',
  'Sitora',
  'Umida',
  'Yulduz',
  'Zarina',
  'Zilola',
  'Ziyoda',
  'Fotima',
  'Hilola',
  'Lola',
  'Mubina',
  'Muslima',
  'Nargiza',
  'Nozima',
  'Robiya',
  'Saida',
  'Shabnam',
  'Shirin',
  'Zebo',
  'Zuhra',
  'Marjona'
];

const lastNames = [
  'Abdullayev',
  'Aliyev',
  'Asqarov',
  'Azimov',
  'Bozorov',
  'Ergashev',
  'Eshonqulov',
  'Fayziyev',
  'Ganiyev',
  'Hamroyev',
  'Ibragimov',
  'Ismoilov',
  'Jalolov',
  'Karimov',
  'Kamilov',
  'Mahmudov',
  'Mamatqulov',
  'Mirzayev',
  'Nazarov',
  'Normurodov',
  'Nurmatov',
  'Ortiqov',
  'Qodirov',
  'Qurbonov',
  'Rahimov',
  'Rasulov',
  'Raxmonov',
  'Ruzmetov',
  'Salimov',
  'Sodiqov',
  'Toshpulatov',
  'Tursunov',
  'Usmonov',
  'Xolmatov',
  'Yusupov',
  'Zokirov',
  'Sharipov',
  'Sobirov',
  'Tojiboyev',
  'Mansurov',
  'Murodov',
  'Olimov',
  'Ravshanov',
  'Saidov',
  'Shukurov',
  'Umarov',
  'Xudoyberdiyev',
  'Yoqubov',
  'Ziyoyev',
  'Hakimov'
];

const maleMiddleNames = [
  'Akmalovich',
  'Alisherovich',
  'Anvarovich',
  'Bahodirovich',
  'Davronovich',
  'Farruxovich',
  'Ilhomovich',
  'Jamshidovich',
  'Komilovich',
  'Rustamovich'
];

const femaleMiddleNames = [
  'Akmalovna',
  'Alisherovna',
  'Anvarovna',
  'Bahodirovna',
  'Davronovna',
  'Farruxovna',
  'Ilhomovna',
  'Jamshidovna',
  'Komilovna',
  'Rustamovna'
];

const toFemaleLastName = (lastName) =>
  lastName.endsWith('yev')
    ? `${lastName.slice(0, -3)}yeva`
    : lastName.endsWith('ov')
      ? `${lastName}a`
      : `${lastName}a`;

const buildBirthDate = (index) => {
  const year = 2004 + (index % 8);
  const month = String((index % 12) + 1).padStart(2, '0');
  const day = String(((index * 7) % 28) + 1).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getStudentStatus = (index) => {
  if (index % 25 === 24) return 'SUSPENDED';
  if (index % 10 === 9) return 'GRADUATED';
  return 'ACTIVE';
};

const students = Array.from({ length: 100 }, (_, index) => {
  const isFemale = index % 2 === 1;
  const nameIndex = Math.floor(index / 2);
  const firstName = isFemale ? femaleFirstNames[nameIndex] : maleFirstNames[nameIndex];
  const baseLastName = lastNames[(index * 7) % lastNames.length];
  const lastName = isFemale ? toFemaleLastName(baseLastName) : baseLastName;
  const middleNames = isFemale ? femaleMiddleNames : maleMiddleNames;
  const seedNumber = String(index + 1).padStart(3, '0');

  return {
    birthDate: buildBirthDate(index),
    email: `${firstName}.${lastName}.${seedNumber}@example.com`.toLowerCase(),
    firstName,
    gender: isFemale ? 'FEMALE' : 'MALE',
    lastName,
    middleName: middleNames[index % middleNames.length],
    phoneNumber: `+99891${String(2000000 + index)}`,
    status: 'ACTIVE',
    studentStatus: getStudentStatus(index)
  };
});

const assertValidDataset = () => {
  const emails = new Set(students.map(({ email }) => email));
  const phoneNumbers = new Set(students.map(({ phoneNumber }) => phoneNumber));

  if (students.length !== 100 || emails.size !== 100 || phoneNumbers.size !== 100) {
    throw new Error('Student seed must contain 100 unique emails and phone numbers');
  }
};

const request = async (path, options = {}) => {
  const response = await fetch(`${apiUrl}/${path.replace(/^\/+/, '')}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      Authorization: authorization,
      ...options.headers
    }
  });

  const responseText = await response.text();
  let responseBody = null;

  if (responseText) {
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = responseText;
    }
  }

  if (!response.ok) {
    throw new Error(
      `${options.method ?? 'GET'} ${path} failed (${response.status}): ${JSON.stringify(responseBody)}`
    );
  }

  return responseBody;
};

const getResults = (response) =>
  response?.results ?? response?.data?.results ?? response?.result?.results ?? [];

const studentExists = async (student) => {
  const query = new URLSearchParams({
    name: `${student.firstName} ${student.lastName}`,
    page: '0',
    size: '100'
  });
  const response = await request(`student?${query}`);

  return getResults(response).some(({ baseData }) => baseData?.email === student.email);
};

const toFormData = (student) => {
  const formData = new FormData();

  formData.append('firstName', student.firstName);
  formData.append('lastName', student.lastName);
  formData.append('middleName', student.middleName);
  formData.append('gender', student.gender);
  formData.append('birthDate', `${student.birthDate}T00:00:00`);
  formData.append('phoneNumber', student.phoneNumber);
  formData.append('email', student.email);
  formData.append('password', password);
  formData.append('status', student.status);
  formData.append('studentStatus', student.studentStatus);

  return formData;
};

const main = async () => {
  assertValidDataset();

  let created = 0;
  let skipped = 0;

  for (const [index, student] of students.entries()) {
    const fullName = `${student.firstName} ${student.lastName}`;

    if (await studentExists(student)) {
      skipped += 1;
      process.stdout.write(`[${index + 1}/${students.length}] Skipped: ${fullName}\n`);
      continue;
    }

    await request('student', {
      method: 'POST',
      body: toFormData(student)
    });

    created += 1;
    process.stdout.write(`[${index + 1}/${students.length}] Created: ${fullName}\n`);
  }

  process.stdout.write(`Student seed completed. Created: ${created}, skipped: ${skipped}.\n`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
