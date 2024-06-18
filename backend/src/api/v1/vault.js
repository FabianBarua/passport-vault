const express = require('express');
const { isUserAuthenticated } = require('../../middlewares/auth');
const Vault = require('../../models/vault');

const router = express.Router();
// todo add isUserAuthenticated middleware and change the userId to req.user.id

router.get('/vault/', isUserAuthenticated, async (req, res) => {
  try {
    const vault = await Vault.findAll({
      where: {
        userId: req.user.id
      }
    });

    return res.json(
      {
        info: {
          message: 'Busqueda exitosa de los datos',
          status: 200
        },
        vault
      }
    );
  } catch (error) {
    return res.json(
      {
        info: {
          message: 'Error buscandos los datos',
          status: 500
        }
      }
    );
  }
});

router.post('/vault/add', async (req, res) => {
  const {
    vaultList
  } = req.body;

  if (
    !vaultList
    || !Array.isArray(vaultList)
    || !vaultList.length
  ) {
    return res.json(
      {
        info: {
          message: 'Faltan datos',
          status: 400
        }
      }
    );
  }

  if (!vaultList.every((vault) => vault.website !== undefined)) {
    return res.json(
      {
        info: {
          message: 'Faltan datos',
          status: 400
        }
      }
    );
  }

  try {
    const vault = await Vault.bulkCreate(
      vaultList.map((item) => ({
        website: item.website,
        email: item.email || null,
        username: item.username || null,
        password: item.password || null,
        favorite: item.favorite || false,
        UserId: 1
      })), {
        returning: true
      }
    );

    return res.json(
      {
        info: {
          message: 'Datos guardados',
          status: 200
        },
        vault
      }
    );
  } catch (error) {
    return res.json(
      {
        info: {
          message: 'Error guardando los datos',
          status: 500,
          stack: error.stack
        }
      }
    );
  }
});

// update
router.put('/vault/update/', isUserAuthenticated, async (req, res) => {
  const {
    id, website, email, username, password, favorite
  } = req.body;

  if (!id) {
    return res.json(
      {
        info: {
          message: 'Faltan datos',
          status: 400
        }
      }
    );
  }

  try {
    const [vault] = await Vault.update(
      {
        website,
        email,
        username,
        password,
        favorite
      },
      {
        where: {
          id,
          UserId: req.user.id
        }
      }
    );

    if (!vault) {
      return res.json(
        {
          info: {
            message: 'Datos no encontrados',
            status: 404
          }
        }
      );
    }

    return res.json(
      {
        info: {
          message: 'Datos actualizados',
          status: 200
        }
      }
    );
  } catch (error) {
    return res.json(
      {
        info: {
          message: 'Error actualizando los datos',
          status: 500
        }
      }
    );
  }
});

// delete
router.delete('/vault/delete/', isUserAuthenticated, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json(
      {
        info: {
          message: 'Faltan datos',
          status: 400
        }
      }
    );
  }

  try {
    await Vault.destroy({
      where: {
        id,
        UserId: 3
      }
    });

    return res.json(
      {
        info: {
          message: 'Datos eliminados',
          status: 200
        }
      }
    );
  } catch (error) {
    return res.json(
      {
        info: {
          message: 'Error eliminando los datos',
          status: 500
        }
      }
    );
  }
});

module.exports = router;
