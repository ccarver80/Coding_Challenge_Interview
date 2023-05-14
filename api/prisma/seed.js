const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const users = await fetch(
    "https://randomuser.me/api/?inc=email,login,location,picture&results=100"
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  for (let i = 0; i < users.results.length; i++) {
    const new_user = await prisma.user.create({
      data: {
        username: users.results[i].login.username,
        password: users.results[i].login.password,
        email: users.results[i].email,
        location:
          users.results[i].location.state +
          " " +
          users.results[i].location.country,
        bio: "Lorem ipsum purus in mollis nunc sed id semper. Suspendisse faucibus interdum posuere lorem ipsum. Blandit volutpat maecenas volutpat blandit. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Aliquet enim tortor at auctor urna nunc id cursus metus.",
        hobbies:
          "Programing, Creative Writing, Selling on Eaby, Playing Minecraft.",
        profilePic: users.results[i].picture.medium,
      },
    });
  }

  const catagories = [
    {
      name: "Test catatgory #1",
      description:
"Test catagory #1"    },
    {
      name: "Test catagory #2",
      description:
        "Test catagory #2",
    },
    {
      name: "Test catagory #3",
      description:
        "Test catagory #3",
    },
    {
      name: "Test catagory #4:",
      description: "Test catagory #4",
    },
    {
      name: "Test catagory #5",
      description:
        "Test catagory #5",
    },
  ];

  for (let i = 0; i < catagories.length; i++) {
    const new_catagory = await prisma.fourmCatagory.create({
      data: {
        name: catagories[i].name,
        description: catagories[i].description,
      },
    });
  }

  for (let i = 1; i <= catagories.length; i++) {
    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let e = 0; e <= 10; e++) {
      id = random(1, 100);
      const post = await fetch(
        "https://uselessfacts.jsph.pl/api/v2/facts/random"
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        });

      const topic = await prisma.fourmPost.create({
        data: {
          title: post.text.slice(0, 20) + "....",
          content: post.text,
          createdAt: new Date().toLocaleString("en-us", { timeZone: "CST" }),
          author: {
            connect: {
              rec_id: id,
            },
          },
          catagory: {
            connect: {
              rec_id: i,
            },
          },
        },
      });

      for (let a = 0; a <= 10; a++) {
        com_id = random(1, 100);
        const com = await fetch(
          "https://uselessfacts.jsph.pl/api/v2/facts/random"
        )
          .then((res) => res.json())
          .then((data) => {
            return data;
          });
        const comment = await prisma.fourmComment.create({
          data: {
            comment: com.text,
            createdAt: new Date().toLocaleString("en-us", { timeZone: "CST" }),
            author: {
              connect: {
                rec_id: com_id,
              },
            },
            post: {
              connect: {
                rec_id: topic.rec_id,
              },
            },
          },
        });
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
