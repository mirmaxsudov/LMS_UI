const apiUrl = process.env.VITE_API_URL?.replace(/\/+$/, '');
const apiToken = process.env.API_TOKEN;
const password = process.env.SEED_TEACHER_PASSWORD ?? 'Teacher123!';

if (!apiUrl) {
  throw new Error('VITE_API_URL is required in .env');
}

if (!apiToken) {
  throw new Error('API_TOKEN is required in .env');
}

const authorization = apiToken.startsWith('Bearer ') ? apiToken : `Bearer ${apiToken}`;

const teachers = [
  ['Aziz', 'Karimov', 'Rustamovich', 'MALE', '1982-03-14', 'PROFESSOR'],
  ['Dilnoza', 'Rahimova', 'Akmalovna', 'FEMALE', '1987-07-22', 'LECTURER'],
  ['Javohir', 'Tursunov', 'Bahodirovich', 'MALE', '1990-11-05', 'LECTURER'],
  ['Malika', 'Usmonova', 'Anvarovna', 'FEMALE', '1992-01-18', 'ASSISTANT'],
  ['Sardor', 'Yusupov', 'Ilhomovich', 'MALE', '1985-09-27', 'PROFESSOR'],
  ['Nodira', 'Abdullayeva', 'Komilovna', 'FEMALE', '1989-04-11', 'LECTURER'],
  ['Bekzod', 'Rasulov', 'Shavkatovich', 'MALE', '1993-06-30', 'ASSISTANT'],
  ['Shahnoza', 'Mamatqulova', 'Erkinovna', 'FEMALE', '1984-12-09', 'PROFESSOR'],
  ['Otabek', 'Nazarov', 'Alisherovich', 'MALE', '1988-02-25', 'LECTURER'],
  ['Mohira', 'Qodirova', 'Saidovna', 'FEMALE', '1991-08-16', 'LECTURER'],
  ['Akmal', 'Sodiqov', 'Hamidovich', 'MALE', '1980-05-03', 'PROFESSOR'],
  ['Zarina', 'Ergasheva', 'Murodovna', 'FEMALE', '1994-10-21', 'ASSISTANT'],
  ['Sanjar', 'Ismoilov', 'Davronovich', 'MALE', '1986-01-12', 'LECTURER'],
  ['Gulnoza', 'Xolmatova', 'Odilovna', 'FEMALE', '1983-06-07', 'PROFESSOR'],
  ['Temur', 'Aliyev', 'Farruxovich', 'MALE', '1992-09-19', 'ASSISTANT'],
  ['Madina', 'Nurmatova', 'Baxtiyorovna', 'FEMALE', '1988-11-28', 'LECTURER'],
  ['Doston', 'Hamroyev', 'Zafarovich', 'MALE', '1981-04-06', 'PROFESSOR'],
  ['Feruza', 'Salimova', 'Jamshidovna', 'FEMALE', '1990-02-14', 'LECTURER'],
  ['Sherzod', 'Ganiyev', 'Sobirovich', 'MALE', '1987-08-01', 'LECTURER'],
  ['Nilufar', 'Tojiboyeva', 'Azimovna', 'FEMALE', '1995-03-23', 'ASSISTANT'],
  ['Umid', 'Mirzayev', 'Qahramonovich', 'MALE', '1984-07-10', 'PROFESSOR'],
  ['Sevara', 'Ortiqova', 'Lazizovna', 'FEMALE', '1991-12-17', 'LECTURER'],
  ['Kamol', 'Eshonqulov', 'Botirovich', 'MALE', '1989-05-29', 'LECTURER'],
  ['Laylo', 'Ibragimova', 'Fozilovna', 'FEMALE', '1993-10-08', 'ASSISTANT'],
  ['Bobur', 'Mahmudov', 'Anvarovich', 'MALE', '1982-01-31', 'PROFESSOR'],
  ['Diyora', 'Kurbanova', 'Ravshanovna', 'FEMALE', '1986-06-15', 'LECTURER'],
  ['Oybek', 'Zokirov', 'Iskandarovich', 'MALE', '1994-09-04', 'ASSISTANT'],
  ['Maftuna', 'Kamilova', 'Ulugbekovna', 'FEMALE', '1988-03-26', 'LECTURER'],
  ['Alisher', 'Ruzmetov', 'Mansurovich', 'MALE', '1979-11-13', 'PROFESSOR'],
  ['Nasiba', 'Fayziyeva', 'Tolibovna', 'FEMALE', '1992-05-20', 'ASSISTANT']
].map(([firstName, lastName, middleName, gender, birthDate, position], index) => ({
  birthDate,
  email: `${firstName}.${lastName}.${index + 1}@example.com`.toLowerCase(),
  firstName,
  gender,
  lastName,
  middleName,
  phoneNumber: `+99890${String(1000000 + index)}`,
  position,
  status: 'ACTIVE'
}));

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

const teacherExists = async (teacher) => {
  const query = new URLSearchParams({
    name: `${teacher.firstName} ${teacher.lastName}`,
    page: '0',
    size: '100'
  });
  const response = await request(`teacher?${query}`);

  return getResults(response).some(({ user }) => user?.email === teacher.email);
};

const toFormData = (teacher) => {
  const formData = new FormData();

  formData.append('firstName', teacher.firstName);
  formData.append('lastName', teacher.lastName);
  formData.append('middleName', teacher.middleName);
  formData.append('gender', teacher.gender);
  formData.append('birthDate', `${teacher.birthDate}T00:00:00`);
  formData.append('phoneNumber', teacher.phoneNumber);
  formData.append('email', teacher.email);
  formData.append('password', password);
  formData.append('status', teacher.status);
  formData.append('position', teacher.position);

  return formData;
};

const main = async () => {
  let created = 0;
  let skipped = 0;

  for (const [index, teacher] of teachers.entries()) {
    if (await teacherExists(teacher)) {
      skipped += 1;
      process.stdout.write(
        `[${index + 1}/${teachers.length}] Skipped: ${teacher.firstName} ${teacher.lastName}\n`
      );
      continue;
    }

    await request('teacher', {
      method: 'POST',
      body: toFormData(teacher)
    });

    created += 1;
    process.stdout.write(
      `[${index + 1}/${teachers.length}] Created: ${teacher.firstName} ${teacher.lastName}\n`
    );
  }

  process.stdout.write(`Teacher seed completed. Created: ${created}, skipped: ${skipped}.\n`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
