<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Ficha;
class FichasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('fichas/index', [
            "fichas"=>Ficha::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('fichas/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'imagen' => 'required'
        ]);

        Ficha::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'imagen' => $request->imagen]);
        return redirect()->route('fichas.index');

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $fichas = Ficha::find($id);
        return Inertia::render('fichas/edit', ["fichas"=>$fichas]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'imagen' => 'required'
        ]);

        $fichas = Ficha::find($id);
        $fichas->nombre = $request->get('nombre');
        $fichas->descripcion = $request->get('descripcion');
        $fichas->imagen = $request->get('imagen');
        $fichas->save();

        return redirect()->route('fichas.index')->with('success', 'Ficha actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Ficha::destroy($id);
        return redirect()->route('fichas.index');
    }
}
