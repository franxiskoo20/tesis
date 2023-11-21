<?php


namespace App\Interfaces;

interface UserRepositoryInterface
{
    public function create(array $data);
    public function findByEmail(string $email);
    public function getAll();
    public function getAuthenticatedUser($request);
    public function update($id, array $data);
    public function delete($id);
}